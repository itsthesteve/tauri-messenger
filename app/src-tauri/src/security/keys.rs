use ed25519_dalek::{SigningKey, VerifyingKey};
use rand::rngs::OsRng;

#[derive(Debug)]
pub struct UserKeys {
    pub private_bytes: [u8; 32],
    pub public_bytes: [u8; 32],
}

pub fn generate_keys() -> UserKeys {
    let mut csprng = OsRng;
    let signing_key: SigningKey = SigningKey::generate(&mut csprng);

    let verifying_key: VerifyingKey = signing_key.verifying_key();

    let private_bytes = signing_key.to_bytes();
    let public_bytes = verifying_key.to_bytes();

    UserKeys {
        private_bytes,
        public_bytes,
    }
}
