export interface IDefaultSellerCustomTypes {
  type: string;
  label: string;
  acceptance_criteria: {
    label: string;
    value: boolean;
  }[];
  return_reasons: {
    label: string;
    value: boolean;
  }[];
  type_arguments?: {
    condition_days: string;
    key: number;
  };
  is_active: boolean;
}
