#!/bin/bash
echo "export const environment = {
  production: $PRODUCTION,
  apiUrl: '$API_URL',
  auth0ClintId: '$AUTH0_CLIENT_ID',
  auth0Domain: '$AUTH0_DOMAIN',
  stripePublicKey: '$STRIPE_PUBLIC_KEY',
  redirectADestination: '$REDIRECT_A_DESTINATION',
  redirectCNAMEDestination: '$REDIRECT_CNAME_DESTINATION'
};
"