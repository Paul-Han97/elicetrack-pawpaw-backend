import { ApiProperty } from "@nestjs/swagger";

export class GetPopularListResponseDto {
    @ApiProperty({
        description: 'board의 id'
    })
    id: number;

    @ApiProperty({
        description: '게시글의 제목'
    })
    title: string;

    @ApiProperty({
        description: '게시글의 이미지 URL'
    })
    imageUrl: string;
}