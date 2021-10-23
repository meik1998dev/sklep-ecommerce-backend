
export class updateProfileDto {
   firstName: string;

   lastName: string;

   phone: string;

   profile_image: string;

   sellerProfile: {
      name: string;
      productGenre: string;
      logoImage: string;
      website: string;
      overview: string;
      branches: [string];
   };
}
