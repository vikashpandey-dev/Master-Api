import { Service, Inject } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '@/decorators/eventDispatcher';
import Helper from '@/Helper';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
@Service()
export default class gupshupService {
  constructor(
    @Inject('logger') private logger,
    @Inject('throwError') private throwError,
  ) {}
  public async gupshup(request: any): Promise<{ record }> {
    const  axios = require("axios")
    const apiKey = '2lik2vr0un9doavqxhrm5clnda6vuiqp'
const apiSecret = 'YOUR_API_SECRET';
    let data;
    try {
   
        const catalogData = {
            template: {"id": "36936720-868d-4cfc-85e3-5cc82a59de59","params": ["Agent","Local Address","Tracking code"]}, // Replace with your catalog template name
            items: [
              {
                name: 'Product 1',
                description: 'Description of Product 1',
                price: '10 USD',
              },
              {
                name: 'Product 2',
                description: 'Description of Product 2',
                price: '20 USD',
              },
            ],
          };
      
          // Upload catalog data to Gupshup
          const response = await axios.post(
            'https://api.gupshup.io/sm/api/v1/catalog.create',
            catalogData,
            {
              headers: {
                'Content-Type': 'application/json',
                'accept':'application/json',
                apiKey,
                
              },
            }
          );
      console.log(response,"response")
          if (response.status === 200) {
            return { record: data };
          } 
    } catch (e) {
        console.log(e,"djkfdkjfhkhk")
      this.logger.error(e);
      this.throwError(Helper.Statuscode.InternalServer, 'Something Went Wrong!');
    }
  }
}

// app.post('/api/send-catalog', async (req, res) => {
//     try {
//       const recipient = 'RECIPIENT_PHONE_NUMBER'; // Replace with the recipient's phone number
//       const template = 'YOUR_CATALOG_TEMPLATE'; // Replace with your catalog template name
  
//       const messageData = {
//         phone: recipient,
//         template,
//       };
  
//       // Send catalog to the recipient
//       const response = await axios.post(
//         'https://api.gupshup.io/sm/api/v1/templateMsg.send',
//         messageData,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             apiKey,
          
//           },
//         }
//       );
  
//       if (response.status === 200) {
//         res.json({ message: 'Catalog sent successfully' });
//       } else {
//         res.status(response.status).json({ error: 'Failed to send catalog' });
//       }
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });