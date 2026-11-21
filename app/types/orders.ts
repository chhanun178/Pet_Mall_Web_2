export type OrderStatus =
  | 'Needs Packing'
  | 'Ready for Pickup'
  | 'Confirmed Booking'
  | 'Shipped'
  | 'Completed'
  | 'Cancelled'

export type FulfillmentType = 'delivery' | 'pickup' | 'service'

export interface OrderItem {
  id: string
  name: string
  sku: string
  shelfLocation?: string
  quantity: number
  unitPrice: number
  image?: string
  weightLbs?: number
  variant?: string
  statusTag?: string // e.g. "Bagged & tagged"
}

export interface ServiceDetail {
  title: string
  durationMinutes: number
  scheduledTime: string
  practitioner: string
  room: string
  intakeStatus: 'Complete' | 'Pending' | 'Action Needed'
  specialAlert?: string // e.g. "Special: Mild Hip Stiffness"
  petAge?: string
  allergies?: string
  temperament?: string
}

export interface OrderCustomer {
  name: string
  email: string
  phone: string
  petName: string
  petBreed: string
  petType: 'dog' | 'cat' | 'other'
  deliveryAddress?: string
  pickupCubby?: string
  notes?: string
}

export interface OrderPricing {
  payoutValue: number
  totalPaid: number
  serviceFee?: number
  subtotal: number
  tax: number
  shippingFee: number
  platformFee: number
  paymentMethod: string
  paymentNote?: string // e.g. "Paid via Apple Pay", "Customer notified via SMS", "Pre-authorized & Secured", "In Transit (ETA Oct 25)"
  paymentStatus: 'paid' | 'pre-authorized' | 'refunded'
}

export interface OrderTimelineEvent {
  title: string
  timestamp: string
  description?: string
  completed: boolean
}

export interface OrderNote {
  id: string
  author: string
  timestamp: string
  text: string
}

export interface Order {
  id: string
  displayId: string // e.g. "#PM-9482"
  status: OrderStatus
  fulfillmentType: FulfillmentType
  placedAt: string
  placedAgo: string // e.g. "Placed 38 mins ago"
  badgeText?: string
  customer: OrderCustomer
  items: OrderItem[]
  service?: ServiceDetail
  pricing: OrderPricing
  shippingCarrier?: string // "UPS Express", "FedEx Ground", etc.
  trackingNumber?: string
  trackingUrl?: string
  carrierScanStatus?: string // e.g. "Carrier Scanned: Portland Hub"
  eta?: string // e.g. "ETA Oct 25"
  notes: OrderNote[]
  isNew?: boolean
  timeline: OrderTimelineEvent[]
}
