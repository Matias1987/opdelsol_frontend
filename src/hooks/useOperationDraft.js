'use client';

import { useState, useEffect, useCallback } from 'react';

const DRAFT_PREFIX = 'op_draft_';
const COMPLETED_KEY = 'completed_ops';

export function useOperationDraft() {
  const saveDraft = useCallback((record) => {
    sessionStorage.setItem(`${DRAFT_PREFIX}${record.id}`, JSON.stringify(record));
  }, []);

  const removeDraft = useCallback((id) => {
    if (!id) return;
    sessionStorage.removeItem(`${DRAFT_PREFIX}${id}`);
  }, []);

  const completeOperation = useCallback((id) => {
    if (!id) return; // Nothing to clear if this was a brand-new standalone form

    sessionStorage.removeItem(`${DRAFT_PREFIX}${id}`);

    const completed = JSON.parse(sessionStorage.getItem(COMPLETED_KEY) || '[]');
    const normalizedId = String(id);
    if (!completed.includes(normalizedId)) {
      sessionStorage.setItem(COMPLETED_KEY, JSON.stringify([...completed, normalizedId]));
    }
  }, []);

  const filterPending = useCallback((items) => {
    if (typeof window === 'undefined') return items;
    const completed = JSON.parse(sessionStorage.getItem(COMPLETED_KEY) || '[]');
    return items.filter((item) => !completed.includes(String(item.id)));
  }, []);

  return {
    saveDraft,
    removeDraft,
    completeOperation,
    filterPending,
  };
}

export function useLoadDraft(id) {
  const [draft, setDraft] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(id));
  const [isInvalidId, setIsInvalidId] = useState(false);

  useEffect(() => {
    // 1. No ID in URL -> User opened the form directly (Create mode)
    if (!id) {
      setDraft(null);
      setIsLoading(false);
      setIsInvalidId(false);
      return;
    }

    // 2. ID is present -> Look up the row's draft in sessionStorage
    const raw = sessionStorage.getItem(`${DRAFT_PREFIX}${id}`);
    if (raw) {
      setDraft(JSON.parse(raw));
      setIsInvalidId(false);
    } else {
      // ID was provided in URL, but no matching draft exists (e.g., already completed)
      setIsInvalidId(true);
    }
    setIsLoading(false);
  }, [id]);

  return { draft, isLoading, isInvalidId };
}
