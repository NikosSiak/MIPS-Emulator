mod utils;

use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern {
    fn alert(s: &str);

    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hello, emulator-wasm!");
}

#[wasm_bindgen]
pub fn test(f: &js_sys::Function) {
    let this = JsValue::null();
    f.call0(&this);
}

#[wasm_bindgen(start)]
pub fn init() {
    utils::set_panic_hook();
}
