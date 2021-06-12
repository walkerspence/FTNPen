module.exports = {
  extends: 'stylelint-config-sass-guidelines',
  plugins: ['stylelint-scss', 'stylelint-order'],
  rules: {
    'at-rule-no-unknown': null,
    'at-rule-no-vendor-prefix': null,
    'selector-class-pattern': null,
    'declaration-no-important': true,
    'max-nesting-depth': 3,
    'media-feature-name-disallowed-list': ['max-width'],
    'order/properties-alphabetical-order': true,
    'no-duplicate-selectors': true,
    'property-no-vendor-prefix': null,
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['use', 'forward'],
      },
    ],
    'selector-max-id': 0,
    'selector-no-qualifying-type': null,
    'selector-no-vendor-prefix': null,
    'value-no-vendor-prefix': null,
  },
};
