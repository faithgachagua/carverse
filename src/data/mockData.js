// Central mock dataset for the Carverse frontend prototype.
// In a real system this would come from an API — everything here
// is shaped so swapping in real fetches later is a drop-in job.

export const vehicles = [
  {
    id: 'v1',
    make: 'Toyota',
    model: 'Land Cruiser VX',
    year: 2021,
    price: 7500000,
    mileageKm: 45000,
    fuel: 'Diesel',
    transmission: 'Automatic',
    engine: '4.5L V8 Turbo Diesel',
    drivetrain: '4WD',
    color: 'Black',
    seats: 7,
    location: 'Nairobi, Kenya',
    rating: 4.8,
    reviews: 24,
    badge: 'NEW',
    description:
      "The Toyota Land Cruiser VX delivers unmatched performance, reliability and luxury. Built for any terrain and every adventure, and well maintained with full service history.",
    features: ['Leather seats', 'Sunroof', '360° camera', 'Adaptive cruise control', 'Third-row seating', 'Heated seats'],
    history: [
      { date: '2024-02-11', event: 'Full service — Toyota Kenya, Nairobi' },
      { date: '2023-08-02', event: 'Tyres replaced (all four)' },
      { date: '2022-01-15', event: 'First registered owner, Nairobi' },
    ],
    images: [
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200&q=80',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200&q=80',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200&q=80',
      'https://images.unsplash.com/photo-1554744512-d6c603f27c54?w=1200&q=80',
    ],
  },
  {
    id: 'v2',
    make: 'BMW',
    model: 'X5 xDrive30d',
    year: 2022,
    price: 6850000,
    mileageKm: 35000,
    fuel: 'Diesel',
    transmission: 'Automatic',
    engine: '3.0L Inline-6 Diesel',
    drivetrain: 'AWD',
    color: 'Alpine White',
    seats: 5,
    location: 'Nairobi, Kenya',
    rating: 4.7,
    reviews: 18,
    description:
      'A refined, athletic SUV that balances performance with everyday comfort. Full BMW service history and one careful owner.',
    features: ['Panoramic roof', 'Harman Kardon audio', 'Heads-up display', 'Ambient lighting', 'Parking assistant'],
    history: [
      { date: '2024-03-20', event: 'Full service — BMW Nairobi' },
      { date: '2023-01-10', event: 'Brake pads replaced' },
    ],
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80',
      'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=1200&q=80',
      'https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?w=1200&q=80',
    ],
  },
  {
    id: 'v3',
    make: 'Mercedes-Benz',
    model: 'GLE 300d',
    year: 2022,
    price: 6200000,
    mileageKm: 28000,
    fuel: 'Diesel',
    transmission: 'Automatic',
    engine: '2.0L Turbo Diesel',
    drivetrain: 'AWD',
    color: 'Obsidian Black',
    seats: 5,
    location: 'Nairobi, Kenya',
    rating: 4.6,
    reviews: 15,
    description:
      'Effortless luxury with MBUX infotainment, air suspension and a cabin built for long-distance comfort.',
    features: ['Air suspension', 'MBUX infotainment', 'Burmester sound', 'Massage seats'],
    history: [{ date: '2024-01-05', event: 'Full service — Mercedes-Benz Nairobi' }],
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&q=80',
      'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=1200&q=80',
    ],
  },
  {
    id: 'v4',
    make: 'Range Rover',
    model: 'Sport HSE',
    year: 2021,
    price: 6850000,
    mileageKm: 30000,
    fuel: 'Petrol',
    transmission: 'Automatic',
    engine: '3.0L Supercharged V6',
    drivetrain: '4WD',
    color: 'Santorini Black',
    seats: 5,
    location: 'Nairobi, Kenya',
    rating: 4.9,
    reviews: 31,
    description:
      'Commanding presence with terrain response, adjustable air suspension, and a cabin trimmed in Windsor leather.',
    features: ['Terrain Response 2', 'Meridian sound system', 'Adaptive dynamics', 'Configurable ambient lighting'],
    history: [{ date: '2024-04-02', event: 'Full service — Land Rover Nairobi' }],
    images: [
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200&q=80',
      'https://images.unsplash.com/photo-1592840062661-a5a7f78e2056?w=1200&q=80',
    ],
  },
  {
    id: 'v5',
    make: 'Toyota',
    model: 'Prado TX-L',
    year: 2020,
    price: 5450000,
    mileageKm: 61000,
    fuel: 'Diesel',
    transmission: 'Automatic',
    engine: '2.8L Turbo Diesel',
    drivetrain: '4WD',
    color: 'Silver',
    seats: 7,
    location: 'Mombasa, Kenya',
    rating: 4.5,
    reviews: 12,
    description: 'A dependable family and off-road SUV with a spotless maintenance record.',
    features: ['Third-row seating', 'Reverse camera', 'Crawl control'],
    history: [{ date: '2023-11-18', event: 'Full service — Toyota Mombasa' }],
    images: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200&q=80',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200&q=80',
    ],
  },
  {
    id: 'v6',
    make: 'Audi',
    model: 'Q7 55 TFSI',
    year: 2021,
    price: 6100000,
    mileageKm: 42000,
    fuel: 'Petrol',
    transmission: 'Automatic',
    engine: '3.0L V6 TFSI',
    drivetrain: 'Quattro AWD',
    color: 'Daytona Grey',
    seats: 7,
    location: 'Nairobi, Kenya',
    rating: 4.6,
    reviews: 9,
    description: 'Quattro all-wheel drive, Matrix LED lighting and a cabin built for seven.',
    features: ['Matrix LED headlights', 'Virtual cockpit', 'Bang & Olufsen sound'],
    history: [{ date: '2024-02-28', event: 'Full service — Audi Nairobi' }],
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=80',
      'https://images.unsplash.com/photo-1541348263662-e068662d82af?w=1200&q=80',
    ],
  },
];

export const stats = [
  { label: 'Vehicles Available', value: '1,250+' },
  { label: 'Happy Customers', value: '5,000+' },
  { label: 'Quality Assured', value: '100%' },
  { label: 'Customer Support', value: '24/7' },
];

// Seed accounts. In this prototype "the database" lives in localStorage,
// seeded from here on first run — see src/context/AuthContext.jsx.
export const seedUsers = [
  {
    id: 'admin-1',
    role: 'admin',
    fullName: 'Grace Achieng',
    username: 'admin',
    password: 'admin123',
    email: 'admin@carverse.co.ke',
  },
  {
    id: 'mem-1',
    role: 'member',
    status: 'approved',
    fullName: 'John Kariuki',
    username: 'johnk',
    password: 'member123',
    email: 'john@example.com',
    phone: '+254 712 000 111',
    joined: '2024-04-28',
  },
];

export const seedRequests = [
  {
    id: 'req-1',
    fullName: 'James Mwangi',
    username: 'jamesmw',
    email: 'james@gmail.com',
    phone: '+254 711 222 333',
    reason: 'Looking to buy a Land Cruiser for my transport business.',
    referral: '',
    status: 'pending',
    submitted: '2024-05-12',
  },
  {
    id: 'req-2',
    fullName: 'Sarah Wanjiku',
    username: 'sarahw',
    email: 'sarah@gmail.com',
    phone: '+254 722 333 444',
    reason: 'Referred by a friend, interested in family SUVs.',
    referral: 'David Kimani',
    status: 'pending',
    submitted: '2024-05-12',
  },
  {
    id: 'req-3',
    fullName: 'Peter Ochieng',
    username: 'petero',
    email: 'peter@gmail.com',
    phone: '+254 733 444 555',
    reason: 'Fleet upgrade for my company.',
    referral: '',
    status: 'pending',
    submitted: '2024-05-11',
  },
  {
    id: 'req-4',
    fullName: 'Mike Otieno',
    username: 'mikeo',
    email: 'mike@gmail.com',
    phone: '+254 744 555 666',
    reason: 'Want early access to new listings.',
    referral: '',
    status: 'pending',
    submitted: '2024-05-11',
  },
];

export const recentMembers = [
  { name: 'David Kimani', username: 'davidk', status: 'Approved', joined: '2024-04-28' },
  { name: 'Alex Mutua', username: 'alexm', status: 'Approved', joined: '2024-04-24' },
  { name: 'Brian Kilonzo', username: 'briank', status: 'Approved', joined: '2024-04-20' },
];

export const seedConversations = [
  {
    id: 'c1',
    vehicleId: 'v1',
    withName: 'David Kimani',
    lastMessage: 'Can we schedule an inspection?',
    time: '2m ago',
    unread: 2,
    messages: [
      { from: 'them', text: 'Hello, is this vehicle still available?', time: '10:30 AM' },
      { from: 'me', text: 'Yes, it is available.', time: '10:31 AM' },
      { from: 'them', text: 'Can I get the inspection report?', time: '10:32 AM' },
      { from: 'me', text: 'Sure, please find it attached.', time: '10:32 AM', attachment: 'inspection-report.pdf' },
      { from: 'them', text: 'Great, thank you!', time: '10:34 AM' },
    ],
  },
  {
    id: 'c2',
    vehicleId: 'v2',
    withName: 'BMW X5 xDrive30d — buyer',
    lastMessage: 'Document uploaded',
    time: '1h ago',
    unread: 0,
    messages: [
      { from: 'them', text: 'Is the price negotiable?', time: '9:10 AM' },
      { from: 'me', text: 'A little — make me an offer.', time: '9:15 AM' },
    ],
  },
  {
    id: 'c3',
    vehicleId: 'v3',
    withName: 'Mercedes-Benz GLE 300d',
    lastMessage: 'Thanks!',
    time: '3h ago',
    unread: 0,
    messages: [{ from: 'them', text: 'Thanks for the quick response!', time: '7:40 AM' }],
  },
  {
    id: 'c4',
    vehicleId: 'v4',
    withName: 'Range Rover Sport HSE',
    lastMessage: 'Price is negotiable',
    time: '1d ago',
    unread: 0,
    messages: [{ from: 'me', text: 'Price is negotiable for serious buyers.', time: 'Yesterday' }],
  },
];

export const notifications = [
  { text: 'New message from David', time: '2m ago', type: 'message' },
  { text: 'Document uploaded in Toyota Land Cruiser VX', time: '1h ago', type: 'document' },
  { text: 'Your listing has been approved', time: '3h ago', type: 'success' },
  { text: 'John reacted to your message', time: '5h ago', type: 'reaction' },
  { text: 'Price updated in BMW X5 xDrive30d', time: '1d ago', type: 'update' },
];

export function formatKES(amount) {
  return `KES ${amount.toLocaleString('en-KE')}`;
}

export const contactInfo = {
  customerCare: {
    phone: '+254 700 123 456',
    hours: 'Mon–Sat, 8:00 AM – 6:00 PM',
    email: 'support@carverse.co.ke',
  },
  salesLine: {
    phone: '+254 711 987 654',
    email: 'sales@carverse.co.ke',
  },
  agencies: [
    { name: 'Carverse Nairobi HQ', location: 'Westlands, Nairobi', phone: '+254 700 111 222' },
    { name: 'Carverse Mombasa', location: 'Nyali, Mombasa', phone: '+254 700 333 444' },
    { name: 'Carverse Kisumu', location: 'Milimani, Kisumu', phone: '+254 700 555 666' },
  ],
};