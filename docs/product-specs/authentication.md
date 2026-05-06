# Authentication Requirements

## Current Rule

Login is mock-only for now. Real KIBO OAuth, certificate login, and simple authentication are not implemented until policy and provider details are confirmed.

## Future OAuth Placeholder

Future implementation must support OAuth 2.0 integration using the KIBO login reference, but this repository must not define real OAuth client IDs, client secrets, certificates, private keys, tokens, scopes, production callback URLs, or provider endpoints beyond reference documentation.

The application must not call `https://www.kibo.or.kr/oauth/login/id` during mock phases.

## Login UI Requirements

Login screen tabs:

- ID login
- Certificate login
- Simple authentication login

ID login fields:

- ID
- Password
- Save ID checkbox
- Keyboard security checkbox
- Login button placeholder
- Mock role buttons for company and institution users in mock PRs

Certificate login tab:

- Joint certificate login placeholder
- Financial certificate login placeholder
- Joint certificate registration placeholder
- Financial certificate registration placeholder
- Certificate guide placeholder

Simple authentication tab:

- Placeholder only until provider details are confirmed.

## Registration

Registration must eventually support individual, company, and institution member flows. Company registration must support digital branch member and VC member types. Identity verification options include KakaoBank authentication and mobile phone authentication as placeholders until integration details are confirmed.

Institution registration details are open.
