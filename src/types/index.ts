export interface Product {
  id: string;
  product_name: string;
  price_sell: number;
  sku_code: string;
  status: "active" | "inactive";
}

export interface Transaction {
  id: string;
  ref_id: string;
  customer_no: string;
  sku_code: string;
  amount_sell: number;
  status: string;
  payment_status: string;
  payment_method: string;
  created_at: string;
  sn?: string;
  message?: string;
}
