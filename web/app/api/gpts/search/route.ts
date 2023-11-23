import { respData, respErr } from "@/app/utils/resp";

import { getRowsByName } from "@/app/models/gpts";
import { searchGpts } from "@/app/services/gpts";

export async function POST(req: Request) {
  const { question, keyword } = await req.json();
  if (!question && !keyword) {
    return respErr("invalid params");
  }

  if (keyword) {
    const data = await getRowsByName(keyword);
    return respData(data);
  }

  const dbData = await getRowsByName(question);
  const vectorData = await searchGpts(question);
  const data = dbData.concat(vectorData);

  return respData(data);
}
