// BASE URL'S
const BASE_API_URL = 'http://localhost:8080';

const AUTH_URL = `${BASE_API_URL}/api/v1/auth`
const CATEGORY_URL = `${BASE_API_URL}/api/v1/category`
const PRODUCT_URL = `${BASE_API_URL}/api/v1/product`

const API_URLS = {
    // AUTH
    register_url : `${AUTH_URL}/register`,
    login_url : `${AUTH_URL}/login`,
    forgot_url : `${AUTH_URL}/forgot-password`,
    admin_url : `${AUTH_URL}/admin`,
    user_auth_url : `${AUTH_URL}/user-auth`,


    // category
    create_category_url : `${CATEGORY_URL}/create-category`,
    get_all_category_url : `${CATEGORY_URL}/get-all`,
    get_category_url : `${CATEGORY_URL}/get-category`,
    update_category_url : `${CATEGORY_URL}/update`,
    delete_category_url : `${CATEGORY_URL}/delete`,

    // Product
    create_product_url : `${PRODUCT_URL}/create`,
    get_all_product_url : `${PRODUCT_URL}/get-all`,
    get_product_url : `${PRODUCT_URL}/get-product`,
    get_photo_url : `${PRODUCT_URL}/get-photo`,
    update_product_url : `${PRODUCT_URL}/update-product`,
    delete_product_url : `${PRODUCT_URL}/delete-product`,
}

export default API_URLS;

