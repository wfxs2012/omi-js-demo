import { Gauge, Layers, LayoutList, Pencil } from 'lucide-omi'

const IconComponents: any = {
  dashboard: Gauge,
  'root-list': LayoutList,
  edit: Pencil,
  layers: Layers,
}

export const Icons = ({ icon = '' }: any) => {
  const Icon: any = IconComponents[icon]
  return <Icon size="16" />
}
