use crate::commands::get_http_client;
use serde_json::{json, Value};

#[tauri::command]
pub async fn create_screen_name(
    screen_name: &str,
    password: &str,
) -> Result<(), std::string::String> {
    let client = get_http_client().unwrap();
    let payload = json!({
        "screenName": screen_name,
        "password": password
    });

    let request = client
        .post("http://localhost:8080/api/v1/createScreenName")
        .json(&payload)
        .send()
        .await;

    // YAH: Finish

    Ok(())
}
