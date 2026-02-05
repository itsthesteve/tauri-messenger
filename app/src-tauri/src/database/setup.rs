pub fn setup_db(app: &mut tauri::App) -> Result<(), Box<dyn std::error::Error>> {
    let app_handle = app.handle();
    let app_data_dir = app_handle
        .path()
        .app_local_data_dir()
        .expect("failed to find app local data dir");

    fs::create_dir_all(&app_data_dir).expect("failed to create data dir");

    let db_path = app_data_dir.join("aim-local.db");
    let db_url = format!("sqlite://{}", db_path.to_string_lossy());

    tauri::async_runtime::block_on(async move {
        let pool = SqlitePoolOptions::new()
            .max_connections(1)
            .connect(&db_url)
            .await
            .expect("Failed to connect to DB");

        app.manage(AppState { db: pool });
    });

    Ok(())
}
