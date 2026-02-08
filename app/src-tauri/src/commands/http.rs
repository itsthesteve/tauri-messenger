use std::time::Duration;

use tauri::http::{header, HeaderValue};
use tauri_plugin_http::reqwest::{Client, ClientBuilder};

pub fn get_http_client() -> Result<Client, Box<dyn std::error::Error>> {
    let mut headers = header::HeaderMap::new();
    headers.insert("X-Aim", HeaderValue::from_static("0.1.0"));
    headers.insert(
        header::CONTENT_TYPE,
        HeaderValue::from_static("application/json"),
    );

    let http_client = ClientBuilder::new()
        .default_headers(headers)
        .timeout(Duration::from_secs(5))
        .build()
        .map_err(|err| {
            if err.is_timeout() {
                return String::from("server timed out; is it running?");
            }

            format!("unknown error creating http client: {}", err)
        })?;

    Ok(http_client)
}
