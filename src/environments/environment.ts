// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  logo_url: 'assets/logo_white.png',
  logo_url_inverse: 'assets/logo.png',
  auth_url: 'http://demo6840991.mockable.io/',
  resetPassword_url: 'http://localhost:5723/api/user/test.php',
  unique_check: 'http://demo6840991.mockable.io/'
};
