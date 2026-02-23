import { createCampaign, dashboard, logout, payment, profile, withdraw } from '../assets';

export const navlinks = [
  {
    name: 'dashboard',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'token-transfer',
    imgUrl: createCampaign,
    link: '/token-transfer',
  },
  {
    name: 'transfer-fund',
    imgUrl: payment,
    link: '/transfer-fund',
  },
  {
    name: 'donate-fund',
    imgUrl: payment,
    link: '/donate-fund',
  },
  {
    name: 'withdraw',
    imgUrl: withdraw,
    link: '/withdraw',
  },
  {
    name: 'update-token',
    imgUrl: createCampaign,
    link: '/update-token',
  },
  {
    name: 'token-price',
    imgUrl: payment,
    link: '/token-price',
  },
  {
    name: 'profile',
    imgUrl: profile,
    link: '/profile',
  },
];