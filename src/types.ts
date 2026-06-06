export interface Province { id: string; name: string; }
export interface SubscriptionPlan { id: string; name: string; durationMonths: number; price: number; discountText: string; }
<<<<<<< HEAD
export interface Store {
  id: string;
  ownerName: string;
  shopName: string;
  category?: string;
  username: string;
  phone: string;
  password: string;
  province: string;
  area: string;
  landmark: string;
  lat?: number;
  lng?: number;
  logo: string;
  deliveryPrice: number;
  isFreeDelivery: boolean;
  status: 'pending' | 'active' | 'suspended';
  subscriptionId: string;
  subscriptionExpiry: string;
  rating: number;
  badges?: string[];
  objectId?: string;
  fcmToken?: string;
  lastUsernameChange?: string;
  isBanned?: boolean;
  showArea?: boolean;
  showLandmark?: boolean;
  showMap?: boolean;
  showPhone?: boolean;
  isVerified?: boolean;
  verificationType?: 'days' | 'months' | 'years' | 'lifetime';
  verificationExpiresAt?: string;
  is_virtual?: boolean;
  walletBalance?: number;
  payoutMethods?: { zainCashNumber?: string; mastercardNumber?: string; };
  subscriptionStatus?: 'none' | 'active' | 'expired';
  subscriptionValidUntil?: string;
  workingHours?: string;
  deliveryAreas?: string;
  storeCoverType?: 'image' | 'color';
  storeCoverValue?: string;
  signature?: string;
  contractAgreedAt?: string;
  terms_accepted?: boolean;
  signed_at?: string;
  promoBanner?: {
    title: string;
    subtitle: string;
    backgroundColor: string;
    textColor: string;
    isActive: boolean;
  };
}
=======
export interface Store { id: string; ownerName: string; shopName: string; category?: string; username: string; phone: string; password: string; province: string; area: string; landmark: string; lat?: number; lng?: number; logo: string; deliveryPrice: number; isFreeDelivery: boolean; status: 'pending' | 'active' | 'suspended'; subscriptionId: string; subscriptionExpiry: string; rating: number; badges?: string[]; objectId?: string; fcmToken?: string; lastUsernameChange?: string; isBanned?: boolean; showArea?: boolean; showLandmark?: boolean; showMap?: boolean; showPhone?: boolean; isVerified?: boolean; verificationType?: 'days' | 'months' | 'years' | 'lifetime'; verificationExpiresAt?: string; is_virtual?: boolean; }
>>>>>>> 18fc01854c1e2793205673b08e1cfbea14a490ab
export interface Product { id: string; storeId: string; name: string; description: string; price: number; costPrice?: number; inventory?: number; discountType: 'none' | 'percent' | 'amount'; discountValue: number; finalPrice: number; image: string; status: 'published' | 'draft' | 'archived'; isFreeDelivery: boolean; specialOffer?: string; tags?: string[]; rating?: number; createdAt: string; barcode?: string; category?: string; objectId?: string; color?: string; size?: string; length?: string; width?: string; weight?: string; condition?: string; warranty?: string; brand?: string; is_virtual?: boolean; }
export interface Customer { 
  id: string; 
  name: string; 
  phone: string; 
  password: string; 
  province: string; 
  address: string; 
  points: number; 
  ordersCount: number; 
  monthlyOrdersCount: number;
  lastResetMonth: string; // YYYY-MM
  joinedAt?: string;
  tier: 'Silver' | 'Gold' | 'Platinum' | 'Diamond'; 
  followedStores: string[]; 
  storeNotifications: string[]; 
<<<<<<< HEAD
=======
  savedReels?: string[];
  likedReels?: string[];
>>>>>>> 18fc01854c1e2793205673b08e1cfbea14a490ab
  isBlocked: boolean; 
  objectId?: string; 
  lat?: number; 
  lng?: number; 
  fcmToken?: string;
  is_virtual?: boolean;
}
<<<<<<< HEAD
export interface Order { id: string; storeId: string; storeName: string; customerId: string; customerName: string; customerPhone: string; customerAddress: string; customerProvince: string; customerLat?: number; customerLng?: number; items: any[]; subtotal: number; deliveryPrice: number; discountAmount: number; total: number; status: 'pending' | 'accepted' | 'shipped' | 'delivered' | 'returned' | 'replaced' | 'rejected'; rejectionReason?: string; returnReason?: string; createdAt: string; promoCode?: string; objectId?: string; discountSponsor?: 'ADMIN' | 'MERCHANT'; }

export interface PayoutRequest {
  id: string;
  merchantId: string;
  requestedAmount: number;
  payoutMethodUsed: 'zain_cash' | 'mastercard';
  payoutMethodDetails: string; // The number or account detail
  status: 'pending' | 'completed';
  createdAt: string;
}

export interface PromoCode { id: string; storeId: string; code: string; discountType?: 'percent' | 'amount' | 'FIXED' | 'PERCENTAGE'; discountValue: number; maxUses: number; maxUsesPerUser?: number; usedCount: number; status: 'active' | 'expired'; startDate?: string; expiresAt?: string | null; source?: 'merchant' | 'admin' | 'points'; ownerCustomerId?: string; createdAt?: string; targetStores?: string[] | 'ALL'; targetProvinces?: string[]; amount?: number; objectId?: string; sponsor?: 'ADMIN' | 'MERCHANT'; merchantId?: string | null; discountAmount?: number; expirationDate?: string | null; targetAudience?: 'ALL' | 'FOLLOWERS' | 'PAST_BUYERS' | 'FOLLOWERS_AND_PAST_BUYERS'; maxGlobalUses?: number; currentGlobalUses?: number; validityDays?: number; }
=======
export interface Order { id: string; storeId: string; storeName: string; customerId: string; customerName: string; customerPhone: string; customerAddress: string; customerProvince: string; customerLat?: number; customerLng?: number; items: any[]; subtotal: number; deliveryPrice: number; discountAmount: number; total: number; status: 'pending' | 'accepted' | 'shipped' | 'delivered' | 'returned' | 'replaced' | 'rejected'; rejectionReason?: string; returnReason?: string; createdAt: string; promoCode?: string; objectId?: string; }
export interface PromoCode { id: string; storeId: string; code: string; discountType?: 'percent' | 'amount'; discountValue: number; maxUses: number; maxUsesPerUser?: number; usedCount: number; status: 'active' | 'expired'; startDate?: string; expiresAt?: string; source?: 'merchant' | 'admin' | 'points'; ownerCustomerId?: string; createdAt?: string; targetStores?: string[]; targetProvinces?: string[]; amount?: number; objectId?: string; }
>>>>>>> 18fc01854c1e2793205673b08e1cfbea14a490ab
export interface RechargeCode { id: string; code: string; points: number; status: 'active' | 'used'; usedBy?: string; usedAt?: string; createdAt: string; objectId?: string; }
export interface StoreReview {
  id: string;
  storeId: string;
  customerId: string;
  customerName: string;
  rating: number;
  message: string;
  createdAt: string;
  isReadByAdmin?: boolean;
}
export interface AppNotification { 
  id: string; 
  userId: string; 
  role: 'customer' | 'merchant' | 'admin'; 
  title: string; 
  message: string; 
  read: boolean; 
  createdAt: string; 
  type?: 'order' | 'subscription' | 'product' | 'promo' | 'event' | 'system';
  targetId?: string;
  objectId?: string; 
<<<<<<< HEAD
  actionLink?: string;
  actionText?: string;
=======
>>>>>>> 18fc01854c1e2793205673b08e1cfbea14a490ab
}
export interface FlashSale { id: string; title: string; description: string; startTime: string; endTime: string; status: 'upcoming' | 'active' | 'ended' | 'paused'; objectId?: string; }
export interface FlashSaleRequest { id: string; flashSaleId: string; storeId: string; productId: string; status: 'pending' | 'approved' | 'rejected'; promotionalPrice: number; quantityLimit?: number; objectId?: string; }

<<<<<<< HEAD
export interface PayoutRequest {
  id: string;
  merchantId: string;
  requestedAmount: number;
  payoutMethodDetails: {
    zainCashNumber?: string;
    mastercardNumber?: string;
  };
  status: 'pending' | 'completed';
  createdAt: string;
=======
export interface Reel {
  id: string;
  videoUrl: string;
  linkedProductId: string;
  merchantId: string;
  createdAt: any;
  likesCount?: number;
  viewsCount?: number;
  commentsCount?: number;
  sharesCount?: number;
  savesCount?: number;
  objectId?: string;
>>>>>>> 18fc01854c1e2793205673b08e1cfbea14a490ab
}

