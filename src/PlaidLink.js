import React, { useState } from 'react';
import { PlaidLink } from 'react-plaid-link';

const PlaidLinkComponent = () => {
  const [linkToken, setLinkToken] = useState(null);

  // Fetch the link token from your API
  const fetchLinkToken = async () => {
    try {
      const response = await fetch(`https://api.local.sally.co/v2/plaid/link-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJfR3BnLXltaFZvdG9hQ1lKdlRXTEFoSTg4TEhsOUFrWVNlM2hTU0h2ZmNzIn0.eyJleHAiOjE3MTg4OTgyNjMsImlhdCI6MTcxODgxMTg2MywianRpIjoiMzFlMGE1ZmItMjA5ZC00MWEwLTg3NmMtYTBkZTU0NGQ2YWI5IiwiaXNzIjoiaHR0cHM6Ly9hdXRoLmxvY2FsLnNhbGx5LmNvL3JlYWxtcy9tYXN0ZXIiLCJzdWIiOiIwYjc1YmY2My04MDQ3LTQ0NWEtOWRhYi1jNmRjZDI4OGFmM2IiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhZG1pbi1jbGkiLCJzZXNzaW9uX3N0YXRlIjoiMmZjZWIwNmItMzkxMy00Zjk5LWJhMTUtODNkNmM0MjI3Yjg0Iiwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiMmZjZWIwNmItMzkxMy00Zjk5LWJhMTUtODNkNmM0MjI3Yjg0IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJhZG1pbiBhZG1pbnMiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJkZXZlbG9wbWVudCIsImdpdmVuX25hbWUiOiJhZG1pbiIsImZhbWlseV9uYW1lIjoiYWRtaW5zIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5hZG1pbiJ9.cvKO5zClDVjovFJbNKtRwssm1fodzftMfRIgovE3oDUD2BYmflmsHN_kV9xsLGe-FFPbCqKdD1d1cK67iwnoxY1YDeEICc9CmCpwhk9KMOYsOUV3rL5JQLrq1YaOeWHnvqRMIHtBxFmdptWp-m5bEToypWbwdZBvvE_vPrJA2HSZNwpA1CPrk9hycn0V1IX5liq1t0g-V3Gn0LKAO6xyw00RfU6-FO8uIev4K4TiVKMBLarsIGpEbqPfoGeQlg1I961U7wsUBxnAj39uy6dsIS6IO6_DvkU1o_QnWKY7IaYBZYxxo9prMcpaIlawZEZXqaqX8vJnMDUsYDbxTaBoGA`,
        },
        body: JSON.stringify({
          client_name: "Test App",
          country_codes: ["US"],
          language: "en",
          user: { client_user_id: "unique-user-id" },
          products: ["auth"]
        })
      });

      // Check if the response is not OK
      if (!response.ok) {
        throw new Error(`Error fetching link token: ${response.statusText}`);
      }

      const data = await response.json();
      setLinkToken(data.link_token);
    } catch (error) {
      console.error('Error fetching link token:', error.message);
    }
  };

  // Use PlaidLink hook
  return (
    <div>
      {!linkToken ? (
        <button onClick={fetchLinkToken}>Get Link Token</button>
      ) : (
        <PlaidLink
          token={linkToken}
          onSuccess={(token, metadata) => {
            console.log('Public Token:', token);
            console.log('Metadata:', metadata);
            // Exchange public token for access token
            fetch(`https://api.local.sally.co/v2/plaid/convert-to-account`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJfR3BnLXltaFZvdG9hQ1lKdlRXTEFoSTg4TEhsOUFrWVNlM2hTU0h2ZmNzIn0.eyJleHAiOjE3MTg4OTgyNjMsImlhdCI6MTcxODgxMTg2MywianRpIjoiMzFlMGE1ZmItMjA5ZC00MWEwLTg3NmMtYTBkZTU0NGQ2YWI5IiwiaXNzIjoiaHR0cHM6Ly9hdXRoLmxvY2FsLnNhbGx5LmNvL3JlYWxtcy9tYXN0ZXIiLCJzdWIiOiIwYjc1YmY2My04MDQ3LTQ0NWEtOWRhYi1jNmRjZDI4OGFmM2IiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhZG1pbi1jbGkiLCJzZXNzaW9uX3N0YXRlIjoiMmZjZWIwNmItMzkxMy00Zjk5LWJhMTUtODNkNmM0MjI3Yjg0Iiwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiMmZjZWIwNmItMzkxMy00Zjk5LWJhMTUtODNkNmM0MjI3Yjg0IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJhZG1pbiBhZG1pbnMiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJkZXZlbG9wbWVudCIsImdpdmVuX25hbWUiOiJhZG1pbiIsImZhbWlseV9uYW1lIjoiYWRtaW5zIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5hZG1pbiJ9.cvKO5zClDVjovFJbNKtRwssm1fodzftMfRIgovE3oDUD2BYmflmsHN_kV9xsLGe-FFPbCqKdD1d1cK67iwnoxY1YDeEICc9CmCpwhk9KMOYsOUV3rL5JQLrq1YaOeWHnvqRMIHtBxFmdptWp-m5bEToypWbwdZBvvE_vPrJA2HSZNwpA1CPrk9hycn0V1IX5liq1t0g-V3Gn0LKAO6xyw00RfU6-FO8uIev4K4TiVKMBLarsIGpEbqPfoGeQlg1I961U7wsUBxnAj39uy6dsIS6IO6_DvkU1o_QnWKY7IaYBZYxxo9prMcpaIlawZEZXqaqX8vJnMDUsYDbxTaBoGA`,
              },
                body: JSON.stringify({ public_token: token, metadata: metadata })
            })
              .then(response => response.json())
              .then(data => {
                console.log('Saved account(s):', JSON.stringify(data, null, 2));
              })
              .catch(error => console.error('Error converting to account:', error));
          }}
          onExit={(error, metadata) => {
            console.log('Exit:', metadata);
            if (error) {
              console.error('Error:', error);
            }
          }}
        >
          Open Plaid Link
        </PlaidLink>
      )}
    </div>
  );
};

export default PlaidLinkComponent;

