export interface Task {
  id: number;
  title: string;
  description: string;
  priority: string;
  deliveryDate: string;
  group: string;
  completed: boolean;
  selected?: boolean;
  state: 'Pending' | 'Done' | 'Deleted';
}