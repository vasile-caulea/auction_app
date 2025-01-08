import { Exclude, Expose, Transform } from "class-transformer";

export class GetUserResponseDto {
    @Expose()
    email: string;

    @Expose()
    firstName: string;

    @Expose()
    lastName: string;

    @Expose()
    birthDate: Date;

    @Expose()
    createdAt: Date;

    // https://typegoose.github.io/typegoose/docs/guides/integration-examples/using-with-class-transformer/
    @Expose()
    @Transform((value) => {
        if ('value' in value) {
            return value.obj[value.key].toString();
        }
        return 'unknown value';
    })
    _id: string;

    @Exclude()
    password: string;
}