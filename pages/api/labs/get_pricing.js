import {CODER_PRICING} from '@/config';

export default async function get_pricing(req, res){
      res.status(200).json(CODER_PRICING);
}