export default function Logo() {
  return (
    <svg width="36" height="32" viewBox="0 0 36 32">
      <rect x="0" y="12" width="6" height="11" rx="2" fill="url(#grad1)" />
      <rect x="12" y="7" width="6" height="16" rx="2" fill="url(#grad2)" />
      <rect x="24" y="5" width="6" height="18" rx="2" fill="url(#grad3)" />
      <defs>
        <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1890ff" />
          <stop offset="100%" stopColor="#40a9ff" />
        </linearGradient>
        <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#52c41a" />
          <stop offset="100%" stopColor="#73d13d" />
        </linearGradient>
        <linearGradient id="grad3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fa8c16" />
          <stop offset="100%" stopColor="#ffc53d" />
        </linearGradient>
      </defs>
    </svg>
  );
}
