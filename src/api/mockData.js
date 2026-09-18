// In-memory seed data for the mock API layer. In a real app this file
// would not exist — these records would come from the backend.

export const seedUsers = [
  { id: 'usr_1', name: 'Ava Thompson', email: 'ava.thompson@nimbus.io', role: 'Admin', status: 'active', registeredAt: '2024-01-12', avatarSeed: 'Ava' },
  { id: 'usr_2', name: 'Liam Carter', email: 'liam.carter@nimbus.io', role: 'Manager', status: 'active', registeredAt: '2024-02-03', avatarSeed: 'Liam' },
  { id: 'usr_3', name: 'Sofia Nguyen', email: 'sofia.nguyen@nimbus.io', role: 'Customer', status: 'inactive', registeredAt: '2024-02-19', avatarSeed: 'Sofia' },
  { id: 'usr_4', name: 'Noah Williams', email: 'noah.williams@nimbus.io', role: 'Customer', status: 'active', registeredAt: '2024-03-01', avatarSeed: 'Noah' },
  { id: 'usr_5', name: 'Emma Rodriguez', email: 'emma.rodriguez@nimbus.io', role: 'Manager', status: 'suspended', registeredAt: '2024-03-14', avatarSeed: 'Emma' },
  { id: 'usr_6', name: 'Oliver Bennett', email: 'oliver.bennett@nimbus.io', role: 'Customer', status: 'active', registeredAt: '2024-04-02', avatarSeed: 'Oliver' },
  { id: 'usr_7', name: 'Mia Patel', email: 'mia.patel@nimbus.io', role: 'Customer', status: 'active', registeredAt: '2024-04-20', avatarSeed: 'Mia' },
  { id: 'usr_8', name: 'Ethan Kim', email: 'ethan.kim@nimbus.io', role: 'Admin', status: 'active', registeredAt: '2024-05-05', avatarSeed: 'Ethan' },
  { id: 'usr_9', name: 'Isabella Garcia', email: 'isabella.garcia@nimbus.io', role: 'Customer', status: 'inactive', registeredAt: '2024-05-22', avatarSeed: 'Isabella' },
  { id: 'usr_10', name: 'Lucas Martin', email: 'lucas.martin@nimbus.io', role: 'Manager', status: 'active', registeredAt: '2024-06-11', avatarSeed: 'Lucas' },
  { id: 'usr_11', name: 'Amelia Clark', email: 'amelia.clark@nimbus.io', role: 'Customer', status: 'active', registeredAt: '2024-06-30', avatarSeed: 'Amelia' },
  { id: 'usr_12', name: 'James Lewis', email: 'james.lewis@nimbus.io', role: 'Customer', status: 'active', registeredAt: '2024-07-15', avatarSeed: 'James' },
]

export const seedProducts = [
  { id: 'prd_1', name: 'Aurora Wireless Headphones', category: 'Audio', price: 129.99, stock: 42, status: 'in-stock', image: 'https://picsum.photos/seed/prd_1/200/200' },
  { id: 'prd_2', name: 'Nimbus Mechanical Keyboard', category: 'Accessories', price: 89.0, stock: 0, status: 'out-of-stock', image: 'https://picsum.photos/seed/prd_2/200/200' },
  { id: 'prd_3', name: 'Zenith 27" 4K Monitor', category: 'Displays', price: 349.5, stock: 15, status: 'in-stock', image: 'https://picsum.photos/seed/prd_3/200/200' },
  { id: 'prd_4', name: 'Orbit Ergonomic Mouse', category: 'Accessories', price: 39.99, stock: 8, status: 'low-stock', image: 'https://picsum.photos/seed/prd_4/200/200' },
  { id: 'prd_5', name: 'Pulse Fitness Tracker', category: 'Wearables', price: 59.99, stock: 120, status: 'in-stock', image: 'https://picsum.photos/seed/prd_5/200/200' },
  { id: 'prd_6', name: 'Halo Desk Lamp', category: 'Home Office', price: 44.0, stock: 6, status: 'low-stock', image: 'https://picsum.photos/seed/prd_6/200/200' },
  { id: 'prd_7', name: 'Voyager Backpack 22L', category: 'Bags', price: 74.5, stock: 33, status: 'in-stock', image: 'https://picsum.photos/seed/prd_7/200/200' },
  { id: 'prd_8', name: 'Drift Bluetooth Speaker', category: 'Audio', price: 54.99, stock: 0, status: 'out-of-stock', image: 'https://picsum.photos/seed/prd_8/200/200' },
  { id: 'prd_9', name: 'Vertex Standing Desk', category: 'Home Office', price: 429.0, stock: 11, status: 'in-stock', image: 'https://picsum.photos/seed/prd_9/200/200' },
  { id: 'prd_10', name: 'Crest Webcam 1080p', category: 'Accessories', price: 29.99, stock: 58, status: 'in-stock', image: 'https://picsum.photos/seed/prd_10/200/200' },
]

const customers = ['Ava Thompson', 'Liam Carter', 'Sofia Nguyen', 'Noah Williams', 'Emma Rodriguez', 'Oliver Bennett', 'Mia Patel', 'Ethan Kim']

export const seedOrders = Array.from({ length: 24 }).map((_, i) => {
  const orderStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
  const paymentStatuses = ['paid', 'pending', 'refunded', 'failed']
  const day = String((i % 27) + 1).padStart(2, '0')
  return {
    id: `ORD-${1000 + i}`,
    customer: customers[i % customers.length],
    date: `2024-${String((i % 8) + 1).padStart(2, '0')}-${day}`,
    total: Number((25 + i * 17.35).toFixed(2)),
    paymentStatus: paymentStatuses[i % paymentStatuses.length],
    orderStatus: orderStatuses[i % orderStatuses.length],
    items: [
      { name: seedProducts[i % seedProducts.length].name, qty: (i % 3) + 1, price: seedProducts[i % seedProducts.length].price },
      { name: seedProducts[(i + 3) % seedProducts.length].name, qty: 1, price: seedProducts[(i + 3) % seedProducts.length].price },
    ],
    shippingAddress: '221B Baker Street, London, UK',
  }
})
