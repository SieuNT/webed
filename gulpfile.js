const elixir = require('laravel-elixir');

elixir.config.sourcemaps = true;
elixir.config.production = true;

const customPath = {
    basePath: './',
    assetsFolder: './resources/assets/',
};
const publicPath = {
    /**
     * Admin paths
     */
    admin: 'public/admin/',
    adminCss: 'public/admin/css/',
    adminImages: 'public/admin/images/',
    adminJs: 'public/admin/js/',
    adminModules: 'public/admin/modules/',
    adminPlugins: 'public/admin/plugins/',
    adminTheme: 'public/admin/theme/',
    /**
     * Front paths
     */
};

/**
 * We don't need to use Vuejs now
 */
//require('laravel-elixir-vue');

var ElixirAssets = function () {
    "use strict";
    return {
        admin: function (mix) {
            /*Admin script*/
            mix
                .scripts([
                    'admin/helpers/**/*.js',
                    'admin/webed/webed.js',
                    'admin/webed/components/**/*.js',
                ], publicPath.adminJs + 'webed-core.js')
                .scripts('admin/script.js', publicPath.adminJs + 'script.js')
                .scripts(customPath.basePath + 'plugins/ecommerce/resources/assets/js/admin/modules/ecommerce/ecommerce.js', publicPath.adminModules + 'ecommerce/ecommerce.js')
                .scripts(customPath.basePath + 'plugins/ecommerce-coupons/resources/assets/js/admin/modules/ecommerce-coupons/ecommerce-coupons.js', publicPath.adminModules + 'ecommerce/coupons/ecommerce-coupons.js')
            ;

            /*Global style*/
            mix
                .sass('admin/webed/style.scss', publicPath.adminCss + 'style.css');

            /*Modules style*/
            mix
                .sass('admin/modules/admin-bar.scss', publicPath.adminCss + 'admin-bar.css')
                .sass('admin/modules/menu/menu-nestable.scss', publicPath.adminModules + 'menu/menu-nestable.css')
                .sass('admin/modules/custom-fields/edit-field-group.scss', publicPath.adminModules + 'custom-fields/edit-field-group.css')
                .sass(customPath.basePath + 'plugins/ecommerce/resources/assets/sass/admin/modules/ecommerce/ecommerce.scss', publicPath.adminModules + 'ecommerce/ecommerce.css')
                .sass(customPath.basePath + 'plugins/ecommerce-product-attributes/resources/assets/sass/admin/modules/ecommerce/ecommerce-product-attributes.scss', publicPath.adminModules + 'ecommerce/product-attributes/ecommerce-product-attributes.css')
                .sass(customPath.basePath + 'plugins/ecommerce-coupons/resources/assets/sass/admin/modules/ecommerce/ecommerce-coupons.scss', publicPath.adminModules + 'ecommerce/coupons/ecommerce-coupons.css')
            ;

            /*Other pages style*/
            mix
                .sass('admin/modules/users/user-profiles/user-profiles.scss', publicPath.adminModules + 'users/user-profiles/user-profiles.css');

            /*Copy items to public*/
            mix
                .copy(customPath.assetsFolder + 'js/admin/modules', publicPath.adminModules);
        },
        front: function (mix) {

        },
    }
}();

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */
elixir(mix => {
    //ElixirAssets.front(mix);
    ElixirAssets.admin(mix);
});
