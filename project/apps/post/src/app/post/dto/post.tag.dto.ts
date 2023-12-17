import { ApiProperty } from "@nestjs/swagger";

export class PostTagDto {
  @ApiProperty({
    description: 'Tag text',
    example: 'sport',
  })
  public text: string;
}
