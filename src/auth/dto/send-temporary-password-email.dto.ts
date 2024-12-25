import { ApiProperty } from "@nestjs/swagger";

export class SendTemporaryPasswordEmailDto {
    @ApiProperty({
        description: '사용자의 이메일',
    })
    email: string;
}