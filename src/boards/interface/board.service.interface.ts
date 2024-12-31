import { ResponseData } from "src/common/types/response.type";
import { GetPopularListQueryDto, GetPopularListResponseDto } from "../dto/get-popular-list.dto";

export interface IBoardService {
    getPopularList(getPopularListQueryDto: GetPopularListQueryDto): Promise<ResponseData<[GetPopularListResponseDto]>>
}
