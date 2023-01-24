export interface checkoutDataType {
    customer?: string,
    price?: string,
    amount?: number,
    freq: 'monthly' | 'annual',
    currency: string,
    client_secret?: string,
}

export type CheckoutDataType = React.Dispatch<React.SetStateAction<checkoutDataType>>