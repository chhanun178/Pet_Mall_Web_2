import { computed } from 'vue'
import { useProducts } from '~/composables/useProducts'

export interface SettlementTransaction {
  id: string
  dateTime: string
  customerName: string
  customerEmail: string
  itemSummary: string
  itemType: 'product' | 'service' | 'neutral'
  paymentMethod: string
  paymentType: 'apple' | 'card' | 'klarna'
  platformFee: string
  platformFeeRate: string
  netPayout: string
  isNegativePayout?: boolean
  status: 'Completed' | 'Settling' | 'Refunded'
}

export interface WeeklyRevenueItem {
  label: string
  total: string
  goodsAmount: string
  servicesAmount: string
  goodsHeight: number
  servicesHeight: number
}

export interface TopOfferingItem {
  rank: number
  name: string
  subtitle: string
  revenue: string
  badgeText: string
  badgeType: 'margin' | 'service'
}

const defaultTransactions: SettlementTransaction[] = [
  {
    id: '#TX-9481',
    dateTime: 'Today, 2:45 PM',
    customerName: 'Clara Sterling',
    customerEmail: 'clarapets@icloud.com',
    itemSummary: '2x Chamomile Paw Balm (60ml)',
    itemType: 'product',
    paymentMethod: 'Apple Pay',
    paymentType: 'apple',
    platformFee: '-$1.44',
    platformFeeRate: '(4.5%)',
    netPayout: '$30.56',
    status: 'Completed',
  },
  {
    id: '#TX-9480',
    dateTime: 'Today, 11:15 AM',
    customerName: 'Marcus Vance',
    customerEmail: 'marcus.v@houndco.org',
    itemSummary: 'Canine Acupressure (60 min)',
    itemType: 'service',
    paymentMethod: 'Visa •••• 4210',
    paymentType: 'card',
    platformFee: '-$3.82',
    platformFeeRate: '(4.5%)',
    netPayout: '$81.18',
    status: 'Completed',
  },
  {
    id: '#TX-9479',
    dateTime: 'Yesterday, 5:30 PM',
    customerName: 'Eleanor Hughes',
    customerEmail: 'e.hughes@studiobark.com',
    itemSummary: 'Herbal Ear Tonic + Paw Trio',
    itemType: 'product',
    paymentMethod: 'Klarna (Pay in 4)',
    paymentType: 'klarna',
    platformFee: '-$2.34',
    platformFeeRate: '(4.5%)',
    netPayout: '$49.66',
    status: 'Settling',
  },
  {
    id: '#TX-9478',
    dateTime: 'Yesterday, 1:12 PM',
    customerName: 'Julian Thorne',
    customerEmail: 'julian@thornevet.org',
    itemSummary: '3x Lavender Calm Droppers',
    itemType: 'product',
    paymentMethod: 'Mastercard •••• 9931',
    paymentType: 'card',
    platformFee: '-$2.97',
    platformFeeRate: '(4.5%)',
    netPayout: '$63.03',
    status: 'Completed',
  },
  {
    id: '#TX-9477',
    dateTime: '2 days ago',
    customerName: 'Hannah Abbot',
    customerEmail: 'hannah.a@meowme.io',
    itemSummary: 'Paw Balm Travel Mini',
    itemType: 'neutral',
    paymentMethod: 'Amex •••• 1004',
    paymentType: 'card',
    platformFee: '$0.00',
    platformFeeRate: '',
    netPayout: '-$12.00',
    isNegativePayout: true,
    status: 'Refunded',
  },
]

const defaultWeeklyRevenue: WeeklyRevenueItem[] = [
  {
    label: 'Week 1',
    total: '$5,070 total',
    goodsAmount: '$3,580',
    servicesAmount: '$1,490',
    goodsHeight: 68,
    servicesHeight: 30,
  },
  {
    label: 'Week 2',
    total: '$6,050 total',
    goodsAmount: '$4,220',
    servicesAmount: '$1,830',
    goodsHeight: 76,
    servicesHeight: 37,
  },
  {
    label: 'Week 3',
    total: '$6,830 total',
    goodsAmount: '$4,710',
    servicesAmount: '$2,120',
    goodsHeight: 82,
    servicesHeight: 42,
  },
  {
    label: 'Week 4',
    total: '$7,400 total',
    goodsAmount: '$4,910',
    servicesAmount: '$2,490',
    goodsHeight: 88,
    servicesHeight: 48,
  },
]

const defaultTopOfferings: TopOfferingItem[] = [
  {
    rank: 1,
    name: 'Chamomile Paw Balm',
    subtitle: '342 units sold',
    revenue: '$5,472.00',
    badgeText: '73.8% margin',
    badgeType: 'margin',
  },
  {
    rank: 2,
    name: 'Canine Acupressure',
    subtitle: '48 bookings',
    revenue: '$4,080.00',
    badgeText: 'Service',
    badgeType: 'service',
  },
  {
    rank: 3,
    name: 'Lavender Calm Dropper',
    subtitle: '145 units sold',
    revenue: '$3,190.00',
    badgeText: '68.2% margin',
    badgeType: 'margin',
  },
]

export const useSales = () => {
  const { showToast } = useProducts()

  const selectedPeriod = useState<string>('sales_selected_period', () => '30d')
  const searchQuery = useState<string>('sales_search_query', () => '')
  const selectedStatus = useState<string>('sales_selected_status', () => 'all')
  const currentPage = useState<number>('sales_current_page', () => 1)

  const transactions = useState<SettlementTransaction[]>('sales_settlement_transactions', () => [...defaultTransactions])
  const weeklyRevenue = useState<WeeklyRevenueItem[]>('sales_weekly_revenue', () => [...defaultWeeklyRevenue])
  const topOfferings = useState<TopOfferingItem[]>('sales_top_offerings', () => [...defaultTopOfferings])

  const filteredTransactions = computed(() => {
    return transactions.value.filter((tx) => {
      const matchesStatus =
        selectedStatus.value === 'all' ||
        tx.status.toLowerCase() === selectedStatus.value.toLowerCase()

      const query = searchQuery.value.trim().toLowerCase()
      const matchesQuery =
        !query ||
        tx.id.toLowerCase().includes(query) ||
        tx.customerName.toLowerCase().includes(query) ||
        tx.customerEmail.toLowerCase().includes(query) ||
        tx.itemSummary.toLowerCase().includes(query)

      return matchesStatus && matchesQuery
    })
  })

  const downloadSalesReport = () => {
    showToast('Sales report (CSV) generated and downloading...')
  }

  const requestExpressPayout = () => {
    showToast('Express payout of $3,420.50 initiated to Silicon Valley Bank (•••• 6192)!')
  }

  const manageBanking = () => {
    showToast('Opening connected payout account settings...')
  }

  return {
    selectedPeriod,
    searchQuery,
    selectedStatus,
    currentPage,
    transactions,
    filteredTransactions,
    weeklyRevenue,
    topOfferings,
    downloadSalesReport,
    requestExpressPayout,
    manageBanking,
  }
}
