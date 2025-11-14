import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SelectCodigoVenta from "./SelectCodigoVenta";
import * as globals from "@/src/globals";
import { get } from "@/src/urls";

jest.mock("@/components/CustomModal", () => {
    return function MockCustomModal({ children, openButtonText }) {
        return <div data-testid="custom-modal">{children}</div>;
    };
});

jest.mock("./SearchStockVentas", () => {
    return function MockSearchStockVentas({ callback }) {
        return (
            <button onClick={() => callback(1)} data-testid="search-button">
                Search
            </button>
        );
    };
});

jest.mock("@/components/etc/imagen/default_image_prod", () => {
    return function MockDefaultImageProduct() {
        return <div data-testid="default-image">Image</div>;
    };
});

describe("SelectCodigoVenta", () => {
    beforeEach(() => {
        global.fetch = jest.fn();
        global.alert = jest.fn();
        globals.obtenerSucursal = jest.fn(() => "sucursal1");
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders modal button initially", () => {
        render(<SelectCodigoVenta />);
        expect(screen.getByTestId("custom-modal")).toBeInTheDocument();
    });

    it("calls callback with codigo data after selection", async () => {
        const callback = jest.fn();
        const mockData = {
            data: [
                {
                    codigo: "PROD001",
                    descripcion: "Product",
                    precio: 100,
                    cantidad: 5,
                },
            ],
        };

        global.fetch.mockResolvedValueOnce({
            json: async () => mockData,
        });

        render(<SelectCodigoVenta callback={callback} />);
        fireEvent.click(screen.getByTestId("search-button"));

        await waitFor(() => {
            expect(callback).toHaveBeenCalledWith(
                expect.objectContaining({
                    codigo: "PROD001",
                    idcodigo: 1,
                })
            );
        });
    });

    it("calls callback with null on remove", async () => {
        const callback = jest.fn();
        global.fetch.mockResolvedValueOnce({
            json: async () => ({
                data: [
                    {
                        codigo: "PROD001",
                        descripcion: "Product",
                        precio: 100,
                        cantidad: 5,
                    },
                ],
            }),
        });

        render(<SelectCodigoVenta callback={callback} />);
        fireEvent.click(screen.getByTestId("search-button"));

        await waitFor(() => {
            expect(screen.getByTestId("default-image")).toBeInTheDocument();
        });

        const closeButton = screen.getByRole("button", { name: "" });
        fireEvent.click(closeButton);

        expect(callback).toHaveBeenLastCalledWith({
            codigo: null,
            precio: 0,
            idcodigo: -1,
        });
    });
});