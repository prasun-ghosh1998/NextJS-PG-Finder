export interface PropertyPayload {
  title: string;
  image: File | null;
  amenities: string;
  price: string;
  location: string;
  name: string;
  tag: string;
  action: string;
  badge: string;
  danger: boolean;
  type:string;
}
interface ProperyDialogProps {
  open: boolean;
  onClose: () => void;
}

export interface PropertyStore {
  list: any[];
  isLoading: boolean;
  error: string | null;

  getPropertyList: () => Promise<any>;

  addProperty: (
    data: PropertyPayload
  ) => Promise<any>;

  updateProperty: (
    id: string,
    data: PropertyPayload
  ) => Promise<any>;

  deleteProperty: (
    id: string
  ) => Promise<any>;
}

