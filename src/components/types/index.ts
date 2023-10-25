export interface button {
  label?: string;
  name: string;
  type?: string;
  loading?: boolean;
  className?: string;
  style?: React.CSSProperties;
  action?: () => void;
}

export interface roomCard {
  title: string;
  image: string;
}
