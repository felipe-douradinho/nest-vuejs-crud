import { IsBoolean, IsOptional } from "class-validator";

class ListKnightsQueryDto {
    @IsOptional()
    @IsBoolean()
    public is_hero?: boolean;
}

export default ListKnightsQueryDto;
