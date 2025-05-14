class BaseResolver {
  clinic_id;
  user_id;
  user_data;
  privilege;
  account_name;
  full_name;
  encoder;
  s3Client;

  constructor() {
    console.log(`BaseResolver constructor`);
  }
}

export default BaseResolver;
