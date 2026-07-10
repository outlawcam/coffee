/* @ds-bundle: {"format":4,"namespace":"StancraftCoffeeDesignSystem_65aedf","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"IconButton","sourcePath":"components/forms/IconButton.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"BrewBadge","sourcePath":"components/product/BrewBadge.jsx"},{"name":"FlavorTag","sourcePath":"components/product/FlavorTag.jsx"},{"name":"ProductCard","sourcePath":"components/product/ProductCard.jsx"},{"name":"RoastMeter","sourcePath":"components/product/RoastMeter.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"d2d8a182180a","components/forms/Button.jsx":"20052224d376","components/forms/IconButton.jsx":"210f3f827e44","components/forms/Input.jsx":"d94f8329ec70","components/forms/Select.jsx":"a52145afc77c","components/product/BrewBadge.jsx":"c67dc10df2c6","components/product/FlavorTag.jsx":"15fea3b7c090","components/product/ProductCard.jsx":"68790fce14ae","components/product/RoastMeter.jsx":"b01b7d246bfa","guidelines/tweaks-panel.jsx":"6591467622ed","ui_kits/landing/Craft.jsx":"1bd8d78e7166","ui_kits/landing/MegaFooter.jsx":"30dd7a6430aa","ui_kits/landing/Products.jsx":"80fa64e4204d","ui_kits/landing/WhereToBuy.jsx":"31710c36d3d7","ui_kits/landing/Wholesale.jsx":"10b449d0c6d3","ui_kits/landing/coffees.js":"f9cfa2950d67","ui_kits/landing/image-slot.js":"96b875730c74","ui_kits/storefront/Cart.jsx":"4d571764af8a","ui_kits/storefront/Chrome.jsx":"941803eea37c","ui_kits/storefront/Home.jsx":"c6f24798e619","ui_kits/storefront/PDP.jsx":"10db3dada8c9","ui_kits/storefront/Shop.jsx":"f840f304ff3f","ui_kits/storefront/data.js":"e12271f7bfa3"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.StancraftCoffeeDesignSystem_65aedf = window.StancraftCoffeeDesignSystem_65aedf || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Small status label. Montserrat uppercase micro-type. */
function Badge({
  children,
  tone = 'neutral',
  style = {},
  ...rest
}) {
  const tones = {
    neutral: {
      background: 'var(--paper-300)',
      color: 'var(--ink-700)',
      border: '1px solid var(--ink-200)'
    },
    ink: {
      background: 'var(--ink-900)',
      color: 'var(--paper-100)',
      border: '1px solid var(--ink-900)'
    },
    accent: {
      background: 'var(--accent)',
      color: 'var(--on-accent)',
      border: '1px solid var(--accent)'
    },
    decaf: {
      background: 'var(--yellow-300)',
      color: 'var(--yellow-700)',
      border: '1px solid var(--yellow-500)'
    },
    cold: {
      background: 'var(--blue-300)',
      color: 'var(--blue-700)',
      border: '1px solid var(--blue-500)'
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '11px',
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      lineHeight: 1,
      padding: '5px 9px',
      borderRadius: 'var(--radius-xs)',
      ...tones[tone],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/forms/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Stancraft primary action. Montserrat, uppercase, tight tracking — matches the
 * condensed wordmark energy. Square-ish corners (kraft label, not a pill).
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  as = 'button',
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      padding: '8px 16px',
      fontSize: '12px'
    },
    md: {
      padding: '12px 24px',
      fontSize: '13px'
    },
    lg: {
      padding: '16px 34px',
      fontSize: '14px'
    }
  };
  const variants = {
    primary: {
      background: 'var(--accent)',
      color: 'var(--on-accent)',
      border: '2px solid var(--accent)'
    },
    secondary: {
      background: 'var(--ink-900)',
      color: 'var(--paper-100)',
      border: '2px solid var(--ink-900)'
    },
    outline: {
      background: 'transparent',
      color: 'var(--ink-900)',
      border: '2px solid var(--ink-900)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--ink-900)',
      border: '2px solid transparent'
    }
  };
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    disabled: Tag === 'button' ? disabled : undefined,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      width: fullWidth ? '100%' : 'auto',
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      lineHeight: 1,
      borderRadius: 'var(--radius-sm)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      textDecoration: 'none',
      transition: 'background var(--dur) var(--ease-standard), color var(--dur) var(--ease-standard), transform var(--dur-fast) var(--ease-standard)',
      ...sizes[size],
      ...variants[variant],
      ...style
    },
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = 'translateY(1px)';
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = 'translateY(0)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = 'translateY(0)';
    }
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Square icon-only button. Uses Lucide glyphs passed as children. */
function IconButton({
  children,
  variant = 'outline',
  size = 'md',
  disabled = false,
  label,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: 32,
    md: 40,
    lg: 48
  };
  const dim = sizes[size];
  const variants = {
    solid: {
      background: 'var(--ink-900)',
      color: 'var(--paper-100)',
      border: '2px solid var(--ink-900)'
    },
    outline: {
      background: 'transparent',
      color: 'var(--ink-900)',
      border: '2px solid var(--ink-900)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--ink-700)',
      border: '2px solid transparent'
    },
    accent: {
      background: 'var(--accent)',
      color: 'var(--on-accent)',
      border: '2px solid var(--accent)'
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": label,
    disabled: disabled,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: dim,
      height: dim,
      borderRadius: 'var(--radius-sm)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      transition: 'background var(--dur) var(--ease-standard), transform var(--dur-fast) var(--ease-standard)',
      ...variants[variant],
      ...style
    },
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = 'scale(0.94)';
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = 'scale(1)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = 'scale(1)';
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Text input with Montserrat label. Underline-forward, paper-grounded. */
function Input({
  label,
  hint,
  error,
  id,
  style = {},
  wrapStyle = {},
  ...rest
}) {
  const inputId = id || (label ? `in-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const borderColor = error ? 'var(--red-500)' : 'var(--ink-200)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      ...wrapStyle
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: '12px',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--ink-700)'
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '17px',
      color: 'var(--ink-900)',
      background: 'var(--paper-000)',
      border: `1px solid ${borderColor}`,
      borderRadius: 'var(--radius-sm)',
      padding: '11px 14px',
      outline: 'none',
      transition: 'border-color var(--dur) var(--ease-standard), box-shadow var(--dur) var(--ease-standard)',
      ...style
    },
    onFocus: e => {
      e.currentTarget.style.borderColor = 'var(--ink-900)';
      e.currentTarget.style.boxShadow = '0 0 0 3px var(--accent-wash)';
    },
    onBlur: e => {
      e.currentTarget.style.borderColor = borderColor;
      e.currentTarget.style.boxShadow = 'none';
    }
  }, rest)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '14px',
      color: error ? 'var(--red-500)' : 'var(--ink-500)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Native select styled to match Input. */
function Select({
  label,
  hint,
  id,
  children,
  style = {},
  wrapStyle = {},
  ...rest
}) {
  const selId = id || (label ? `sel-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      ...wrapStyle
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: selId,
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: '12px',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--ink-700)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: selId,
    style: {
      appearance: 'none',
      WebkitAppearance: 'none',
      width: '100%',
      fontFamily: 'var(--font-body)',
      fontSize: '17px',
      color: 'var(--ink-900)',
      background: 'var(--paper-000)',
      border: '1px solid var(--ink-200)',
      borderRadius: 'var(--radius-sm)',
      padding: '11px 40px 11px 14px',
      outline: 'none',
      cursor: 'pointer',
      transition: 'border-color var(--dur) var(--ease-standard)',
      ...style
    },
    onFocus: e => {
      e.currentTarget.style.borderColor = 'var(--ink-900)';
    },
    onBlur: e => {
      e.currentTarget.style.borderColor = 'var(--ink-200)';
    }
  }, rest), children), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      right: '14px',
      top: '50%',
      transform: 'translateY(-50%)',
      pointerEvents: 'none',
      color: 'var(--ink-500)',
      fontSize: '12px'
    }
  }, "\u25BE")), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '14px',
      color: 'var(--ink-500)'
    }
  }, hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/product/BrewBadge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * BrewBadge — how a coffee is best prepared. Espresso / Filter / Cold brew /
 * Omni. Uses a Lucide glyph + Montserrat micro label. Cold uses the blue job.
 */
function BrewBadge({
  method = 'omni',
  active = true,
  style = {},
  ...rest
}) {
  const config = {
    espresso: {
      label: 'Espresso',
      icon: 'coffee',
      wash: 'var(--paper-300)',
      ink: 'var(--espresso-700)',
      dot: 'var(--espresso-500)'
    },
    filter: {
      label: 'Filter',
      icon: 'filter',
      wash: 'var(--paper-300)',
      ink: 'var(--ink-700)',
      dot: 'var(--ink-500)'
    },
    cold: {
      label: 'Cold brew',
      icon: 'snowflake',
      wash: 'var(--blue-300)',
      ink: 'var(--blue-700)',
      dot: 'var(--blue-700)'
    },
    omni: {
      label: 'Omni',
      icon: 'infinity',
      wash: 'var(--yellow-300)',
      ink: 'var(--yellow-700)',
      dot: 'var(--yellow-700)'
    }
  };
  const c = config[method] || config.omni;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: '11px',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      lineHeight: 1,
      padding: '6px 10px',
      borderRadius: 'var(--radius-sm)',
      background: active ? c.wash : 'transparent',
      color: active ? c.ink : 'var(--ink-300)',
      border: `1px solid ${active ? c.dot : 'var(--ink-200)'}`,
      opacity: active ? 1 : 0.55,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("i", {
    "data-lucide": c.icon,
    style: {
      width: 14,
      height: 14
    }
  }), c.label);
}
Object.assign(__ds_scope, { BrewBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/BrewBadge.jsx", error: String((e && e.message) || e) }); }

// components/product/FlavorTag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * FlavorTag — a single tasting note from the flavor wheel, colored by family.
 * A row of these is how Stancraft PDPs describe the cup.
 */
function FlavorTag({
  note,
  family = 'sweet',
  style = {},
  ...rest
}) {
  const fam = {
    fruit: ['var(--flavor-fruit)', 'var(--flavor-fruit-wash)', 'var(--flavor-fruit-ink)'],
    floral: ['var(--flavor-floral)', 'var(--flavor-floral-wash)', 'var(--flavor-floral-ink)'],
    sweet: ['var(--flavor-sweet)', 'var(--flavor-sweet-wash)', 'var(--flavor-sweet-ink)'],
    chocolate: ['var(--flavor-chocolate)', 'var(--flavor-chocolate-wash)', 'var(--flavor-chocolate-ink)'],
    nutty: ['var(--flavor-nutty)', 'var(--flavor-nutty-wash)', 'var(--flavor-nutty-ink)'],
    spice: ['var(--flavor-spice)', 'var(--flavor-spice-wash)', 'var(--flavor-spice-ink)'],
    roast: ['var(--flavor-roast)', 'var(--flavor-roast-wash)', 'var(--flavor-roast-ink)'],
    vegetal: ['var(--flavor-vegetal)', 'var(--flavor-vegetal-wash)', 'var(--flavor-vegetal-ink)'],
    citrus: ['var(--flavor-citrus)', 'var(--flavor-citrus-wash)', 'var(--flavor-citrus-ink)']
  };
  const [dot, wash, ink] = fam[family] || fam.sweet;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '7px',
      fontFamily: 'var(--font-body)',
      fontWeight: 500,
      fontSize: '15px',
      color: ink,
      background: wash,
      border: `1px solid ${dot}`,
      borderRadius: 'var(--radius-pill)',
      padding: '5px 13px 5px 10px',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 9,
      height: 9,
      borderRadius: '50%',
      background: dot,
      flex: '0 0 auto'
    }
  }), note);
}
Object.assign(__ds_scope, { FlavorTag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/FlavorTag.jsx", error: String((e && e.message) || e) }); }

// components/product/RoastMeter.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * RoastMeter — light→dark roast indicator as 5 filled beans/marks.
 * level 1 (Light) … 5 (Dark). Filled marks use espresso brown.
 */
function RoastMeter({
  level = 3,
  showLabel = true,
  style = {},
  ...rest
}) {
  const labels = {
    1: 'Light',
    2: 'Light–Medium',
    3: 'Medium',
    4: 'Medium–Dark',
    5: 'Dark'
  };
  const marks = [1, 2, 3, 4, 5];
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '4px'
    }
  }, marks.map(m => /*#__PURE__*/React.createElement("span", {
    key: m,
    style: {
      width: 16,
      height: 16,
      borderRadius: 'var(--radius-xs)',
      background: m <= level ? 'var(--espresso-500)' : 'transparent',
      border: `1.5px solid ${m <= level ? 'var(--espresso-500)' : 'var(--ink-200)'}`,
      transition: 'background var(--dur) var(--ease-standard)'
    }
  }))), showLabel && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: '12px',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--espresso-700)'
    }
  }, labels[level]));
}
Object.assign(__ds_scope, { RoastMeter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/RoastMeter.jsx", error: String((e && e.message) || e) }); }

// components/product/ProductCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * ProductCard — a single coffee on the shop grid. Composes Badge, FlavorTag,
 * RoastMeter and Button. Image area falls back to a kraft label plate.
 */
function ProductCard({
  name,
  origin,
  price,
  roast = 3,
  notes = [],
  badge = null,
  image = null,
  bagColor = 'var(--paper-300)',
  onAdd,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-hairline)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      transition: 'box-shadow var(--dur) var(--ease-standard), transform var(--dur) var(--ease-standard)',
      ...style
    },
    onMouseEnter: e => {
      e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      e.currentTarget.style.transform = 'translateY(-3px)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.boxShadow = 'none';
      e.currentTarget.style.transform = 'translateY(0)';
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: '4 / 3',
      background: image ? `center/cover no-repeat url(${image})` : bagColor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottom: '1px solid var(--border-hairline)'
    }
  }, !image && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: '13px',
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: 'var(--ink-300)'
    }
  }, origin || 'Stancraft'), badge && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 12,
      left: 12
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: badge.tone || 'accent'
  }, badge.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      padding: '18px 18px 20px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '3px'
    }
  }, origin && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: '11px',
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: 'var(--ink-300)'
    }
  }, origin), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: '22px',
      letterSpacing: '-0.01em',
      color: 'var(--ink-900)',
      lineHeight: 1.08
    }
  }, name)), /*#__PURE__*/React.createElement(__ds_scope.RoastMeter, {
    level: roast
  }), notes.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px'
    }
  }, notes.slice(0, 3).map((n, i) => /*#__PURE__*/React.createElement(__ds_scope.FlavorTag, {
    key: i,
    note: n.note,
    family: n.family,
    style: {
      fontSize: '13px',
      padding: '3px 10px 3px 8px'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: '4px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '20px',
      color: 'var(--ink-900)'
    }
  }, typeof price === 'number' ? `$${price.toFixed(2)}` : price), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    size: "sm",
    onClick: onAdd
  }, "Add"))));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/ProductCard.jsx", error: String((e && e.message) || e) }); }

// guidelines/tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "guidelines/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/Craft.jsx
try { (() => {
// Our Craft section — editorial. Global React.
function Craft() {
  const principles = [['flame', 'Roasted to order', 'We roast the week you buy and ship the next day. Nothing sits in a warehouse losing its voice.'], ['sprout', 'Sourced by relationship', 'We buy named lots from farmers and importers we return to season after season — not commodity bags off a spot market.'], ['bean', 'Whole bean, always', 'We do not grind. Fresh grinding at home is the single biggest upgrade to your cup, so we leave it in your hands.']];
  return /*#__PURE__*/React.createElement("section", {
    id: "craft",
    style: {
      background: 'var(--espresso-900)',
      color: 'var(--paper-100)',
      padding: '96px 40px',
      scrollMarginTop: 72
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 64,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      aspectRatio: '4 / 5',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.08)'
    }
  }, /*#__PURE__*/React.createElement("image-slot", {
    id: "land-craft",
    shape: "rect",
    placeholder: "Roastery / makers photo"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 12,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: 'var(--ink-300)',
      margin: '0 0 14px'
    }
  }, "Our craft"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 40,
      letterSpacing: '-0.02em',
      margin: '0 0 20px',
      lineHeight: 1.06
    }
  }, "We roast to protect the cup, not to chase a color."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 18,
      lineHeight: 1.62,
      color: 'var(--paper-200)',
      margin: '0 0 34px',
      maxWidth: '48ch'
    }
  }, "Stancraft is a small roastery run by people who drink a lot of coffee and are hard to please. Every origin earns its spot on a profile we dial by taste \u2014 light enough to keep what makes it worth buying, developed enough to be a pleasure to brew."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 22
    }
  }, principles.map(([icon, h, b], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '0 0 auto',
      width: 26,
      display: 'flex',
      justifyContent: 'center',
      color: 'var(--paper-200)',
      paddingTop: 2
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    style: {
      width: 20,
      height: 20
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 18,
      margin: '2px 0 4px'
    }
  }, h), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 16,
      lineHeight: 1.55,
      color: 'var(--ink-300)',
      margin: 0
    }
  }, b))))))));
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/Craft.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/MegaFooter.jsx
try { (() => {
// Mega footer — company blurb, makers, social links, trustmark. Global React.
// Facebook/Instagram brand glyphs are inlined (Lucide dropped brand icons).
const SOCIAL_ICONS = {
  facebook: /*#__PURE__*/React.createElement("path", {
    d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
  }),
  instagram: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
    width: "20",
    height: "20",
    x: "2",
    y: "2",
    rx: "5",
    ry: "5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "17.5",
    x2: "17.51",
    y1: "6.5",
    y2: "6.5"
  }))
};
function SocialLink({
  icon,
  label,
  href
}) {
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 11,
      textDecoration: 'none',
      color: 'var(--paper-100)',
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 13,
      letterSpacing: '0.1em',
      textTransform: 'uppercase'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 42,
      height: 42,
      borderRadius: 'var(--radius-sm)',
      border: '1px solid rgba(255,255,255,0.22)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, SOCIAL_ICONS[icon])), label);
}
function MegaFooter() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--espresso-900)',
      color: 'var(--paper-200)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '72px 40px 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr',
      gap: 56,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 460
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.__resources && window.__resources.logoWhite || "../../assets/logo-stancraft-white.svg",
    alt: "Stancraft Coffee Co",
    style: {
      height: 28,
      marginBottom: 20
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 16,
      lineHeight: 1.64,
      color: 'var(--ink-300)',
      margin: '0 0 18px'
    }
  }, "Stancraft Coffee Co is a small-batch roaster and distributor built by a crew of former baristas and green buyers who got tired of stale coffee. We roast to order in small drums, source named lots by relationship, and ship whole bean so the cup you pour is the cup we tasted."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 16,
      lineHeight: 1.64,
      color: 'var(--ink-300)',
      margin: 0
    }
  }, "Founded by roasters, for the particular.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 34
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 12,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: 'var(--yellow-500)',
      margin: '0 0 16px'
    }
  }, "Follow along"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(SocialLink, {
    icon: "facebook",
    label: "Facebook",
    href: "#"
  }), /*#__PURE__*/React.createElement(SocialLink, {
    icon: "instagram",
    label: "Instagram",
    href: "#"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      padding: '14px 22px',
      border: '1px solid rgba(255,255,255,0.16)',
      borderRadius: 'var(--radius-sm)',
      alignSelf: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.__resources && window.__resources.scaLogo || "../../assets/sca-member-white.png",
    alt: "Specialty Coffee Association",
    style: {
      height: 46,
      width: 'auto',
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      alignSelf: 'stretch',
      background: 'rgba(255,255,255,0.16)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 12,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--paper-100)'
    }
  }, "Member \xB7 CVA Certified"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--ink-300)'
    }
  }, "Coffee Value Assessment scoring on every lot"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 20,
      flexWrap: 'wrap',
      marginTop: 56,
      paddingTop: 24,
      borderTop: '1px solid rgba(255,255,255,0.10)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 11,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--ink-500)'
    }
  }, "\xA9 2026 Stancraft Coffee Co \xB7 Roasted to order"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--ink-500)'
    }
  }, "Temporary site \u2014 full shop opening soon on Shopify."))));
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/MegaFooter.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/Products.jsx
try { (() => {
// Products — minimalist. Two groups (organic / non-organic), airy grid, type-led. Global React.

function CoffeeCard({
  c
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      aspectRatio: '1 / 1',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("image-slot", {
    id: `land-${c.id}`,
    shape: "rect",
    fit: "contain",
    src: "../../assets/bean-placeholder-50.png",
    placeholder: `${c.region} — bean or region photo`
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      padding: '18px 0 0'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 11,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: 'var(--ink-300)',
      margin: '0 0 5px'
    }
  }, c.region), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 20,
      letterSpacing: '-0.01em',
      color: 'var(--ink-900)',
      margin: 0,
      lineHeight: 1.12
    }
  }, c.name), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 11,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--ink-500)',
      margin: '7px 0 0'
    }
  }, c.process, " \xB7 ", c.roast)), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      lineHeight: 1.5,
      color: 'var(--ink-500)',
      margin: 0
    }
  }, c.notes), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      gap: 10,
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 18,
      color: 'var(--ink-900)'
    }
  }, "$", c.price), c.tag && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 11,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: c.tag === 'Decaf' ? 'var(--yellow-700)' : 'var(--accent)'
    }
  }, c.tag))));
}
function CoffeeGroup({
  label,
  list
}) {
  if (list.length === 0) return null;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 16,
      borderBottom: '1px solid var(--border-hairline)',
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 13,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: 'var(--ink-500)',
      margin: 0
    }
  }, label)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '40px 30px'
    }
  }, list.map(c => /*#__PURE__*/React.createElement(CoffeeCard, {
    key: c.id,
    c: c
  }))));
}
const BREW_METHODS = [['drip', 'Drip'], ['espresso', 'Espresso'], ['cold', 'Cold Brew'], ['french', 'French Press']];
function Products() {
  const C = window.STANCRAFT_COFFEES;
  const [active, setActive] = React.useState([]);
  const toggle = m => setActive(a => a.includes(m) ? a.filter(x => x !== m) : [...a, m]);
  // AND filter: a lot must support every selected method.
  const match = c => active.every(m => (c.methods || []).includes(m));
  const organic = C.organic.filter(match);
  const nonOrganic = C.nonOrganic.filter(match);
  const empty = organic.length === 0 && nonOrganic.length === 0;
  return /*#__PURE__*/React.createElement("section", {
    id: "products",
    style: {
      background: 'var(--paper-100)',
      padding: '96px 40px',
      scrollMarginTop: 72
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 620,
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 12,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: 'var(--ink-500)',
      margin: '0 0 14px'
    }
  }, "The lineup"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 40,
      letterSpacing: '-0.02em',
      color: 'var(--ink-900)',
      margin: '0 0 14px',
      lineHeight: 1.04
    }
  }, "The coffees."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 18,
      lineHeight: 1.6,
      color: 'var(--ink-500)',
      margin: 0
    }
  }, "Whole bean, roasted to order. Prices are per 12 oz bag unless noted.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      flexWrap: 'wrap',
      marginBottom: 56
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 11,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: 'var(--ink-300)',
      marginRight: 4
    }
  }, "Brew for"), BREW_METHODS.map(([key, label]) => {
    const on = active.includes(key);
    return /*#__PURE__*/React.createElement("button", {
      key: key,
      onClick: () => toggle(key),
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        fontSize: 12,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        padding: '9px 16px',
        borderRadius: 'var(--radius-pill)',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        background: on ? 'var(--ink-900)' : 'transparent',
        color: on ? 'var(--paper-100)' : 'var(--ink-700)',
        border: `1px solid ${on ? 'var(--ink-900)' : 'var(--ink-200)'}`,
        transition: 'background var(--dur) var(--ease-standard), color var(--dur) var(--ease-standard), border-color var(--dur) var(--ease-standard)'
      }
    }, label);
  }), active.length > 0 && /*#__PURE__*/React.createElement("button", {
    onClick: () => setActive([]),
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 11,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--ink-300)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      marginLeft: 4
    }
  }, "Clear")), empty ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 17,
      color: 'var(--ink-500)',
      margin: '8px 0 0'
    }
  }, "No coffees match all of those brew methods. Try removing one.") : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 72
    }
  }, /*#__PURE__*/React.createElement(CoffeeGroup, {
    label: "Organic",
    list: organic
  }), /*#__PURE__*/React.createElement(CoffeeGroup, {
    label: "Non-organic",
    list: nonOrganic
  }))));
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/Products.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/WhereToBuy.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Where to Buy — farmer's market, stockist cafés, and email. Minimalist. Global React.
function WhereToBuy() {
  // TODO: fill café names + real shop URLs; swap market/email links for the real ones.
  const channels = [{
    icon: 'tent',
    title: 'Nacogdoches Farmer\u2019s Market',
    link: false,
    body: 'Find our stand at the Nacogdoches Farmer\u2019s Market for fresh whole bean and a hello from the roasters.',
    links: [{
      label: 'Market info',
      href: '#'
    }]
  }, {
    icon: 'coffee',
    title: 'At local coffee shops',
    link: false,
    body: 'Several East Texas shops brew and sell Stancraft in house. Grab a cup or a bag from:',
    links: [{
      label: 'Coffee shop one',
      href: '#'
    }, {
      label: 'Coffee shop two',
      href: '#'
    }, {
      label: 'Coffee shop three',
      href: '#'
    }]
  }, {
    icon: 'mail',
    title: 'Order by email',
    link: false,
    body: 'Want beans shipped or held for pickup? Email us what you\u2019re after and we\u2019ll sort it out.',
    links: [{
      label: 'orders@stancraft.co',
      href: 'mailto:orders@stancraft.co'
    }]
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "where",
    style: {
      background: 'var(--paper-100)',
      padding: '96px 40px',
      borderTop: '1px solid var(--border-hairline)',
      scrollMarginTop: 72
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 620,
      marginBottom: 52
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 12,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: 'var(--ink-500)',
      margin: '0 0 12px'
    }
  }, "Where to buy"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 40,
      letterSpacing: '-0.02em',
      color: 'var(--ink-900)',
      margin: '0 0 14px',
      lineHeight: 1.04
    }
  }, "Three ways to get it."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 18,
      lineHeight: 1.6,
      color: 'var(--ink-500)',
      margin: 0
    }
  }, "Whole bean, roasted to order \u2014 at the market, from a shop that brews us, or straight from the roastery.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 30
    }
  }, channels.map((ch, i) => {
    const isMail = (ch.links[0] || {}).href && ch.links[0].href.indexOf('mailto:') === 0;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        paddingTop: 24,
        borderTop: '1px solid var(--border-hairline)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: 'var(--ink-900)'
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": ch.icon,
      style: {
        width: 24,
        height: 24
      }
    })), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 22,
        letterSpacing: '-0.01em',
        color: 'var(--ink-900)',
        margin: 0
      }
    }, ch.title), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 16,
        lineHeight: 1.56,
        color: 'var(--ink-500)',
        margin: 0
      }
    }, ch.body), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        marginTop: 'auto',
        paddingTop: 6
      }
    }, ch.links.map((l, j) => /*#__PURE__*/React.createElement("a", _extends({
      key: j,
      href: l.href
    }, l.href.indexOf('mailto:') === 0 ? {} : {
      target: '_blank',
      rel: 'noopener noreferrer'
    }, {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        fontSize: 13,
        letterSpacing: '0.04em',
        color: 'var(--accent)',
        textDecoration: 'none'
      }
    }), /*#__PURE__*/React.createElement("i", {
      "data-lucide": l.href.indexOf('mailto:') === 0 ? 'mail' : 'arrow-up-right',
      style: {
        width: 15,
        height: 15
      }
    }), l.label))));
  }))));
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/WhereToBuy.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/Wholesale.jsx
try { (() => {
// Wholesale section — pitch + inquiry form. Global React.
const {
  Button: WButton,
  Input: WInput,
  Select: WSelect,
  Badge: WBadge
} = window.StancraftCoffeeDesignSystem_65aedf;
function Wholesale() {
  const [sent, setSent] = React.useState(false);
  const [form, setForm] = React.useState({
    name: '',
    business: '',
    email: '',
    city: '',
    volume: '20–50 lb / mo',
    message: ''
  });
  const set = k => e => setForm(f => ({
    ...f,
    [k]: e.target.value
  }));
  return /*#__PURE__*/React.createElement("section", {
    id: "wholesale",
    style: {
      background: 'var(--paper-200)',
      padding: '96px 40px',
      scrollMarginTop: 72
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1120,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 64,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 12,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: 'var(--ink-500)',
      margin: '0 0 14px'
    }
  }, "Wholesale"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 40,
      letterSpacing: '-0.02em',
      color: 'var(--ink-900)',
      margin: '0 0 18px',
      lineHeight: 1.06
    }
  }, "Pour Stancraft at your bar."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 18,
      lineHeight: 1.62,
      color: 'var(--ink-700)',
      margin: '0 0 28px',
      maxWidth: '46ch'
    }
  }, "Caf\xE9s, offices, and restaurants: we roast to your order on a standing schedule, dial espresso with your team, and keep the origins on your menu honest. Whole bean, delivered fresh."), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: '0',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, ['Standing weekly or biweekly roast schedule', 'Espresso dial-in and staff training', 'Named-origin menu cards and brew specs', 'Wholesale pricing from 20 lb / month'].map((t, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      fontFamily: 'var(--font-body)',
      fontSize: 16,
      color: 'var(--ink-700)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "check",
    style: {
      width: 18,
      height: 18,
      color: 'var(--ink-500)',
      marginTop: 3,
      flex: '0 0 auto'
    }
  }), /*#__PURE__*/React.createElement("span", null, t))))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-hairline)',
      borderRadius: 'var(--radius-lg)',
      padding: 32,
      boxShadow: 'var(--shadow-sm)'
    }
  }, sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '40px 8px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 52,
      height: 52,
      borderRadius: '50%',
      background: 'var(--accent)',
      color: '#fff',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "check"
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 26,
      color: 'var(--ink-900)',
      margin: '0 0 8px'
    }
  }, "Inquiry received."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 16,
      color: 'var(--ink-500)',
      margin: '0 0 22px'
    }
  }, "We'll be in touch within two business days, ", form.name ? form.name.split(' ')[0] : 'thanks', "."), /*#__PURE__*/React.createElement(WButton, {
    variant: "outline",
    onClick: () => setSent(false)
  }, "Send another")) : /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setSent(true);
    },
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 24,
      color: 'var(--ink-900)',
      margin: '0 0 2px'
    }
  }, "Wholesale inquiry"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(WInput, {
    label: "Your name",
    value: form.name,
    onChange: set('name'),
    required: true,
    placeholder: "Jordan Vega"
  }), /*#__PURE__*/React.createElement(WInput, {
    label: "Business",
    value: form.business,
    onChange: set('business'),
    required: true,
    placeholder: "Meridian Caf\xE9"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(WInput, {
    label: "Email",
    type: "email",
    value: form.email,
    onChange: set('email'),
    required: true,
    placeholder: "you@cafe.com"
  }), /*#__PURE__*/React.createElement(WInput, {
    label: "City / State",
    value: form.city,
    onChange: set('city'),
    placeholder: "Austin, TX"
  })), /*#__PURE__*/React.createElement(WSelect, {
    label: "Estimated volume",
    value: form.volume,
    onChange: set('volume')
  }, /*#__PURE__*/React.createElement("option", null, "Under 20 lb / mo"), /*#__PURE__*/React.createElement("option", null, "20\u201350 lb / mo"), /*#__PURE__*/React.createElement("option", null, "50\u2013100 lb / mo"), /*#__PURE__*/React.createElement("option", null, "100+ lb / mo")), /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 12,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--ink-700)'
    }
  }, "What are you looking for?"), /*#__PURE__*/React.createElement("textarea", {
    value: form.message,
    onChange: set('message'),
    rows: 3,
    placeholder: "Brew method, current roaster, timeline\u2026",
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 17,
      color: 'var(--ink-900)',
      background: 'var(--paper-000)',
      border: '1px solid var(--ink-200)',
      borderRadius: 'var(--radius-sm)',
      padding: '11px 14px',
      outline: 'none',
      resize: 'vertical'
    }
  })), /*#__PURE__*/React.createElement(WButton, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    type: "submit",
    style: {
      marginTop: 4
    }
  }, "Send inquiry"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--ink-500)',
      margin: 0,
      textAlign: 'center'
    }
  }, "Or email ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--ink-900)'
    }
  }, "wholesale@stancraft.co"))))));
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/Wholesale.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/coffees.js
try { (() => {
// Stancraft Coffee — real catalog (11 coffees; grouped organic / non-organic).
// Whole bean only. Fields: name, region, process, roast, notes, price, tag (limited/decaf).
window.STANCRAFT_COFFEES = {
  organic: [{
    id: 'chechele',
    name: 'Yirgacheffe Chechele',
    region: 'Ethiopia',
    process: 'Natural',
    roast: 'Medium-light',
    price: 24,
    methods: ['drip', 'cold', 'french'],
    notes: 'Dark chocolate, dried dark berry, vanilla, and black tea.'
  }, {
    id: 'chelbessa',
    name: 'Yirgacheffe Chelbessa',
    region: 'Ethiopia',
    process: 'Washed',
    roast: 'Medium-light',
    price: 24,
    methods: ['drip', 'cold'],
    notes: 'Fresh lemon, cooked berry and dried jasmine, with a tart citric acidity and mild sugary sweetness.'
  }, {
    id: 'quabballe',
    name: 'Guji Quabballe',
    region: 'Ethiopia',
    process: 'Natural',
    roast: 'Light',
    price: 25,
    methods: ['drip', 'cold'],
    notes: 'Blueberry, hops, lavender, and lime.'
  }, {
    id: 'koke',
    name: 'Yirgacheffe Koke',
    region: 'Ethiopia',
    process: 'Honey',
    roast: 'Light',
    price: 27,
    methods: ['drip', 'cold', 'french'],
    notes: 'Intense blueberry and honey-blossom sweetness — a very bright cup.'
  }, {
    id: 'huehue',
    name: 'Huehuetenango',
    region: 'Guatemala',
    process: 'Washed',
    roast: 'Medium',
    price: 22,
    methods: ['drip', 'espresso', 'cold', 'french'],
    notes: 'Fruit and wine, nutty, and chocolatey.'
  }],
  nonOrganic: [{
    id: 'pitalito',
    name: 'Huila Pitalito Supremo',
    region: 'Colombia',
    process: 'Washed',
    roast: 'Medium',
    price: 20,
    methods: ['drip', 'espresso', 'cold', 'french'],
    notes: 'Chocolate, almond, and cherry.'
  }, {
    id: 'strawberry',
    name: 'Strawberry Co-Ferment',
    region: 'Colombia',
    process: 'Co-ferment',
    roast: 'Light-medium',
    price: 31,
    tag: 'Limited · 8 oz',
    methods: ['drip', 'cold'],
    notes: 'Intense sour-then-sweet acidity with a candy-like finish — a chocolate-covered strawberry.'
  }, {
    id: 'banana',
    name: 'Pink Bourbon Cake Banana Co-Ferment',
    region: 'Colombia',
    process: 'Co-ferment',
    roast: 'Light-medium',
    price: 31,
    tag: 'Limited · 8 oz',
    methods: ['drip', 'cold'],
    notes: 'Banana Laffy Taffy, bubblegum, and wedding-cake sno-cone. Intense candy sweetness, no sharpness at all.'
  }, {
    id: 'mundo-maya',
    name: 'Carlos Cadena Mundo Maya',
    region: 'Mexico',
    process: 'Natural · extended ferment',
    roast: 'Medium',
    price: 28,
    methods: ['drip', 'espresso', 'french'],
    notes: 'Cooked cranberry, dark chocolate, clove, and artificial blackberry. Boozy acidity and mild syrupy sweetness.'
  }, {
    id: 'haraz',
    name: 'Sharqi Haraz',
    region: 'Yemen',
    process: 'Natural',
    roast: 'Medium-dark',
    price: 34,
    methods: ['espresso', 'french', 'drip'],
    notes: 'Densely packed cocoa — raw cacao, 82% dark chocolate, cocoa nibs, faint stone fruit, and a tobacco finish.'
  }, {
    id: 'ea-decaf',
    name: 'EA Decaf',
    region: 'Colombia',
    process: 'Decaf',
    roast: 'Medium-dark',
    price: 20,
    tag: 'Decaf',
    methods: ['drip', 'espresso', 'french'],
    notes: 'Lemon, walnut, and brown sugar. Remarkably clean for a decaf.'
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/coffees.js", error: String((e && e.message) || e) }); }

// ui_kits/landing/image-slot.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
/* BEGIN USAGE */
/**
 * <image-slot> — user-fillable image placeholder.
 *
 * Drop this into a deck, mockup, or page wherever a design needs an image.
 * You control the slot's shape; it sizes to its container by default. When the search_stock_photos tool
 * is available, prefill the slot by default — write the photo's URL into
 * src (with credit/credit-href); the user can still fill or replace it
 * by dragging an image file onto it (or clicking to browse). The dropped
 * image persists across reloads via a .image-slots.state.json sidecar —
 * same read-via-fetch / write-via-window.omelette pattern as
 * design_canvas.jsx, so the filled slot shows on share links, downloaded
 * zips, and PPTX export. Outside the omelette runtime the slot is read-only.
 *
 * The sidecar is a SIBLING of the HTML file that uses this component: the
 * read is a document-relative fetch, and the host resolves the bridge's
 * sidecar writes into the previewed file's directory to match (same
 * contract as design_canvas.jsx). Pages in the same directory share one
 * sidecar; keep slot ids distinct across them.
 *
 * Attributes:
 *   id           Persistence key. REQUIRED for the drop to survive reload —
 *                every slot on the page needs a distinct id.
 *   shape        'rect' | 'rounded' | 'circle' | 'pill'   (default 'rounded')
 *                'circle' applies 50% border-radius; on a non-square slot
 *                that's an ellipse — set equal width and height for a true
 *                circle.
 *   radius       Corner radius in px for 'rounded'.       (default 12)
 *   mask         Any CSS clip-path value. Overrides `shape` — use this for
 *                hexagons, blobs, arbitrary polygons.
 *   fit          Initial framing baseline: cover | contain.   (default 'cover')
 *                cover starts the image filling the frame (overflow cropped);
 *                contain starts it fully visible (letterboxed). Either way the
 *                user can always pan/scale from there — double-click, or the
 *                Edit control, enters reframe mode (drag to move, scroll or
 *                corner-handles to scale; Escape / click-out commits). The
 *                crop persists alongside the image in the sidecar.
 *   placeholder  Empty-state caption.                      (default 'Drop an image')
 *   src          Optional initial/fallback image URL. Prefill it with a real
 *                photo via search_stock_photos when that tool is available
 *                (set credit/credit-href from the result). A user drop
 *                overrides it; clearing the drop reveals src again.
 *   credit       Attribution text shown as a small overlay at the
 *                bottom-left of the filled slot. REQUIRED whenever src
 *                points at any Unsplash host (images.unsplash.com,
 *                plus.unsplash.com, …): an Unsplash src with no credit
 *                renders an error tile INSTEAD of the photo (Unsplash
 *                terms forbid showing their photos unattributed). Use the
 *                exact form 'Photo by {photographer name} on Unsplash' —
 *                the overlay then links the name to credit-href and
 *                'Unsplash' to the Unsplash homepage, and links back to
 *                unsplash.com automatically get the required utm referral
 *                params appended at render time. The credit belongs to
 *                the src image, so it only shows while src is what's
 *                displayed — a user-dropped image hides it.
 *   credit-href  Link for the photographer's name in the credit overlay
 *                (their Unsplash profile URL from the stock-photo search
 *                results). http(s) URLs only — anything else renders the
 *                name as plain text.
 *
 * Sizing: the slot fills its container by default (width/height 100%).
 * Put it in a sized wrapper — absolutely positioned, a grid cell, a fixed
 * frame — and it takes exactly that box. When the parent's height is
 * indefinite (ordinary flow), it falls back to full width at a 3:2 aspect
 * ratio instead of collapsing. In a shrink-to-fit parent (a float,
 * width:max-content, an unsized absolute wrapper), percentages have
 * nothing to resolve against — size the slot or its wrapper explicitly
 * there. For a fixed-size slot, set
 * width/height on the element itself (inline style), which overrides the
 * default. When
 * layering content above a slot (full-bleed layouts), make the overlay
 * click-through — pointer-events: none on scrims/text plates, re-enabled
 * on interactive children — so the slot's hover controls stay reachable.
 * Keep the slot's bottom-left corner visually clear as well: the credit
 * overlay renders there, and a dark fade or text plate covering it hides
 * the attribution Unsplash's terms require — end the fade above that
 * corner, or keep it nearly transparent where the credit sits.
 *
 * Usage:
 *   <div style="position:relative;width:100%;height:100%">      <!-- full-bleed: -->
 *     <image-slot id="bg" shape="rect"></image-slot>            <!-- fills the wrapper -->
 *   </div>
 *   <image-slot id="hero"   style="width:800px;height:450px" shape="rounded" radius="20"
 *               placeholder="Drop a hero image"></image-slot>
 *   <image-slot id="avatar" style="width:120px;height:120px" shape="circle"></image-slot>
 *   <image-slot id="kite"   style="width:300px;height:300px"
 *               mask="polygon(50% 0, 100% 50%, 50% 100%, 0 50%)"></image-slot>
 */
/* END USAGE */

(() => {
  const STATE_FILE = '.image-slots.state.json';

  // Unsplash terms require visible attribution wherever their photos
  // display, and every link back to unsplash.com must carry utm referral
  // params. Two render-time rules enforce that here:
  //  - an Unsplash-src slot with NO credit attribute renders an error
  //    tile INSTEAD of the photo (an uncredited Unsplash photo on screen
  //    is itself the terms violation, so it never renders bare);
  //  - rendered credit links pointing at unsplash.com get the referral
  //    params appended when absent (credit-href values live in page
  //    content that can't be edited after the fact).
  // Keep the utm_source value in sync with UTM_SOURCE in
  // platform/web-agent/unsplash.ts — this file is a project-local
  // artifact and cannot import it (equality is pinned by tests).
  const UNSPLASH_HOMEPAGE_HREF = 'https://unsplash.com/?utm_source=claude_design&utm_medium=referral';
  // Host rule mirrors the hotlink validator that admits Unsplash srcs into
  // pages in the first place (cdn$ in unsplash.ts: apex or any subdomain)
  // — Unsplash+ results serve from plus.unsplash.com, not just images.*,
  // and an admitted-but-uncredited photo must error whatever unsplash
  // host it rides on.
  // Trailing-dot FQDNs (images.unsplash.com.) are the same host to the
  // browser but would miss the regex — strip one dot so the check fails
  // CLOSED (unrecognized-but-real Unsplash srcs must error, not render).
  const isUnsplashHost = u => {
    try {
      return /(^|\.)unsplash\.com$/.test(new URL(u, document.baseURI).hostname.replace(/\.$/, ''));
    } catch {
      return false;
    }
  };
  // Render-time referral normalization for links back to Unsplash:
  // appends utm_source/utm_medium when absent, preserves every existing
  // query param, never overwrites an existing utm_source, and passes
  // non-Unsplash URLs through untouched. Input is an ABSOLUTE validated
  // http(s) URL (the credit render funnel resolves + validates first).
  const withReferral = href => {
    try {
      const u = new URL(href);
      if (!/(^|\.)unsplash\.com$/.test(u.hostname.replace(/\.$/, ''))) {
        return href;
      }
      if (!u.searchParams.has('utm_source')) {
        u.searchParams.set('utm_source', 'claude_design');
      }
      if (!u.searchParams.has('utm_medium')) {
        u.searchParams.set('utm_medium', 'referral');
      }
      return u.toString();
    } catch (e) {
      return href;
    }
  };
  // 2× a ~600px slot in a 1920-wide deck — retina-sharp without making the
  // sidecar enormous. A 1200px WebP at q=0.85 is ~150-300KB.
  const MAX_DIM = 1200;
  // Raster formats only. SVG is excluded (can carry script; createImageBitmap
  // on SVG blobs is inconsistent). GIF is excluded because the canvas
  // re-encode keeps only the first frame, so an animated GIF would silently
  // go still — better to reject than surprise.
  const ACCEPT = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'];

  // ── Shared sidecar store ────────────────────────────────────────────────
  // One fetch + immediate write-on-change for every <image-slot> on the
  // page. Reads via fetch() so viewing works anywhere the HTML and sidecar
  // are served together; writes go through window.omelette.writeFile, which
  // the host allowlists to *.state.json basenames only.
  const subs = new Set();
  let slots = {};
  // ids explicitly cleared before the sidecar fetch resolved — otherwise
  // the merge below can't tell "never set" from "just deleted" and would
  // resurrect the sidecar's stale value.
  const tombstones = new Set();
  let loaded = false;
  let loadP = null;
  function load() {
    if (loadP) return loadP;
    loadP = fetch(STATE_FILE).then(r => r.ok ? r.json() : null).then(j => {
      // Merge: sidecar loses to any in-memory change that raced ahead of
      // the fetch (drop or clear) so neither is clobbered by hydration.
      if (j && typeof j === 'object') {
        const merged = Object.assign({}, j, slots);
        // A framing-only write that raced ahead of hydration must not
        // drop a user image that's only on disk — inherit u from the
        // sidecar for any in-memory entry that lacks one.
        for (const k in slots) {
          if (merged[k] && !merged[k].u && j[k]) {
            merged[k].u = typeof j[k] === 'string' ? j[k] : j[k].u;
          }
        }
        for (const id of tombstones) delete merged[id];
        slots = merged;
      }
      tombstones.clear();
    }).catch(() => {}).then(() => {
      loaded = true;
      subs.forEach(fn => fn());
    });
    return loadP;
  }

  // Serialize writes so two near-simultaneous drops on different slots
  // can't reorder at the backend and leave the sidecar with only the
  // first. A save requested mid-flight just marks dirty and re-fires on
  // completion with the then-current slots.
  let saving = false;
  let saveDirty = false;
  // Unload-time flush: save()'s serialization defers a mid-RTT re-fire to a
  // .then that never runs in an unloading document, silently dropping a
  // pagehide commit. Post the current slots immediately instead — content
  // is a superset snapshot of any in-flight save's, the write is a
  // whole-file last-writer-wins replace, and postMessage FIFO delivers it
  // to the host after the in-flight one, so a backend-side reorder at
  // worst reproduces the dropped-commit outcome this flush improves on.
  // Guarded on the initial sidecar read: pre-hydration slots can miss
  // other slots' persisted entries, and flushing it would clobber them —
  // that narrow case stays best-effort (the in-memory merge in load()
  // cannot happen in an unloading document anyway).
  function flushNow() {
    if (!loaded) return;
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    try {
      Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {});
    } catch (e) {}
  }
  function save() {
    if (saving) {
      saveDirty = true;
      return;
    }
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    saving = true;
    Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {}).then(() => {
      saving = false;
      if (saveDirty) {
        saveDirty = false;
        save();
      }
    });
  }
  const S_MAX = 5;
  const clampS = s => Math.max(1, Math.min(S_MAX, s));

  // Normalize a stored slot value. Pre-reframe sidecars stored a bare
  // data-URL string; newer ones store {u, s, x, y}. Either shape is valid.
  function getSlot(id) {
    const v = slots[id];
    if (!v) return null;
    return typeof v === 'string' ? {
      u: v,
      s: 1,
      x: 0,
      y: 0
    } : v;
  }
  function setSlot(id, val) {
    if (!id) return;
    if (val) {
      slots[id] = val;
      tombstones.delete(id);
    } else {
      delete slots[id];
      if (!loaded) tombstones.add(id);
    }
    subs.forEach(fn => fn());
    // A drop is rare + high-value — write immediately so nav-away can't lose
    // it. Gate on the initial read so we don't overwrite a sidecar we haven't
    // merged yet; the merge in load() keeps this change once the read lands.
    if (loaded) save();else load().then(save);
  }

  // ── Image downscale ─────────────────────────────────────────────────────
  // Encode through a canvas so the sidecar carries resized bytes, not the
  // raw upload. Longest side is capped at 2× the slot's rendered width
  // (retina) and at MAX_DIM. WebP keeps alpha and is ~10× smaller than PNG
  // for photos, so there's no need for per-image format picking.
  async function toDataUrl(file, targetW) {
    const bitmap = await createImageBitmap(file);
    try {
      const cap = Math.min(MAX_DIM, Math.max(1, Math.round(targetW * 2)) || MAX_DIM);
      const scale = Math.min(1, cap / Math.max(bitmap.width, bitmap.height));
      const w = Math.max(1, Math.round(bitmap.width * scale));
      const h = Math.max(1, Math.round(bitmap.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(bitmap, 0, 0, w, h);
      return canvas.toDataURL('image/webp', 0.85);
    } finally {
      bitmap.close && bitmap.close();
    }
  }

  // ── Custom element ──────────────────────────────────────────────────────
  const stylesheet =
  // Fill the container by default: slots are usually placed inside a
  // sized wrapper (a hero frame, a grid cell, an inset:0 layer) and are
  // expected to take that box — a fixed intrinsic size would render as
  // a small tile in the corner of a full-bleed wrapper instead.
  // aspect-ratio is the companion fallback that keeps a bare slot
  // visible when the parent's height is indefinite: height:100%
  // resolves to auto there, and the ratio then derives height from
  // width instead of letting the slot collapse to zero height.
  // Explicit width/height on the element override all of this.
  ':host{display:block;position:relative;' + '  font:13px/1.3 system-ui,-apple-system,sans-serif;color:rgba(0,0,0,.55);' + '  width:100%;height:100%;aspect-ratio:3/2}' + '.frame{position:absolute;inset:0;overflow:hidden;background:rgba(0,0,0,.04)}' +
  // .frame img (clipped) and .spill (unclipped ghost + handles) share the
  // same left/top/width/height in frame-%, computed by _applyView(), so the
  // inside-mask crop and the outside-mask spill stay pixel-aligned.
  '.frame img{position:absolute;max-width:none;transform:translate(-50%,-50%);' + '  -webkit-user-drag:none;user-select:none;touch-action:none}' +
  // Reframe mode (double-click): the full image spills past the mask. The
  // spill layer is sized to the IMAGE bounds so its corners are where the
  // resize handles belong. The ghost <img> inside is translucent; the real
  // clipped <img> underneath shows the opaque in-mask crop.
  // popover=manual promotes the spill to the top layer on reframe, so it is
  // not clipped by any overflow:hidden / clip-path / scroll-container
  // ancestor (a plain z-index can't escape overflow clipping). UA popover
  // defaults (inset:0;margin:auto) are reset; _applyView sets viewport px.
  '.spill{position:fixed;margin:0;inset:auto;border:0;padding:0;background:transparent;' + '  overflow:visible;transform:translate(-50%,-50%);z-index:1;cursor:grab;touch-action:none}' + ':host([data-panning]) .spill{cursor:grabbing}' + '.spill .ghost{position:absolute;inset:0;width:100%;height:100%;opacity:.35;' + '  pointer-events:none;-webkit-user-drag:none;user-select:none;' + '  box-shadow:0 0 0 1px rgba(0,0,0,.2),0 12px 32px rgba(0,0,0,.2)}' + '.spill .handle{position:absolute;width:12px;height:12px;border-radius:50%;' + '  background:#fff;box-shadow:0 0 0 1.5px #c96442,0 1px 3px rgba(0,0,0,.3);' + '  transform:translate(-50%,-50%)}' + '.spill .handle[data-c=nw]{left:0;top:0;cursor:nwse-resize}' + '.spill .handle[data-c=ne]{left:100%;top:0;cursor:nesw-resize}' + '.spill .handle[data-c=sw]{left:0;top:100%;cursor:nesw-resize}' + '.spill .handle[data-c=se]{left:100%;top:100%;cursor:nwse-resize}' + ':host([data-reframe]){z-index:10}' + ':host([data-reframe]) .frame{box-shadow:0 0 0 2px #c96442}' + '.empty{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  cursor:pointer;user-select:none}' + '.empty svg{opacity:.45}' + '.empty .cap{max-width:90%;font-weight:500;letter-spacing:.01em}' + '.empty .sub{font-size:11px}' + '.empty .sub u{text-underline-offset:2px;text-decoration-color:rgba(0,0,0,.25)}' + '.empty:hover .sub u{color:rgba(0,0,0,.75);text-decoration-color:currentColor}' + ':host([data-over]) .frame{outline:2px solid #c96442;outline-offset:-2px;' + '  background:rgba(201,100,66,.10)}' + '.ring{position:absolute;inset:0;pointer-events:none;border:1.5px dashed rgba(0,0,0,.25);' + '  transition:border-color .12s}' + ':host([data-over]) .ring{border-color:#c96442}' + ':host([data-filled]) .ring{display:none}' +
  // Controls overlay INSIDE the frame, pinned to the top-right corner, so
  // a full-bleed slot in an overflow:hidden container still shows them
  // (the old below-mask placement got clipped). Credit sits bottom-left,
  // so top-right avoids collision. The blurred pill background keeps them
  // legible over the image.
  // The UA [popover] base rule styles the element in EVERY state (only
  // display:none is gated on :not(:popover-open), and the display:flex
  // below overrides that) — so the UA resets live HERE, like .spill's,
  // or the ordinary hover-state strip renders as a bordered Canvas box
  // centered by margin:auto. inset:auto precedes top/right (shorthand).
  '.ctl{position:absolute;inset:auto;top:8px;right:8px;margin:0;border:0;padding:0;' + '  background:transparent;overflow:visible;' + '  display:flex;gap:6px;opacity:0;pointer-events:none;transition:opacity .12s;z-index:2;' + '  white-space:nowrap}' +
  // While reframing, the spill owns the top layer and would swallow every
  // click on the in-frame controls. Promoting .ctl into the top layer
  // ABOVE the spill (shown after it — later popovers stack higher) keeps
  // Edit-as-toggle and Replace clickable mid-reframe. _applyView pins it
  // to the frame's top-right in viewport px (translateX(-100%)
  // right-aligns against the computed left edge); inset:auto clears the
  // base rule's top/right so the inline left/top position it alone.
  '.ctl:popover-open{position:fixed;inset:auto;transform:translateX(-100%)}' + ':host([data-filled][data-editable]:hover) .ctl,:host([data-reframe]) .ctl' + '  {opacity:1;pointer-events:auto}' + '.ctl button{appearance:none;border:0;border-radius:6px;padding:5px 10px;cursor:pointer;' + '  background:rgba(0,0,0,.65);color:#fff;font:11px/1 system-ui,-apple-system,sans-serif;' + '  backdrop-filter:blur(6px)}' + '.ctl button:hover{background:rgba(0,0,0,.8)}' + '.err{position:absolute;left:8px;bottom:8px;right:8px;color:#b3261e;font-size:11px;' + '  background:rgba(255,255,255,.85);padding:4px 6px;border-radius:5px;pointer-events:none}' + '.credit{position:absolute;left:6px;bottom:6px;max-width:calc(100% - 12px);display:none;' + '  padding:3px 7px;border-radius:5px;background:rgba(0,0,0,.55);color:#fff;' + '  font:10px/1.2 system-ui,-apple-system,sans-serif;text-decoration:none;' + '  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;backdrop-filter:blur(6px)}' +
  // The credit is a SPAN holding one or two <a>s (Unsplash's prescribed
  // form links the photographer AND Unsplash) — anchors style inline so
  // the overlay reads as one line of text.
  '.credit a{color:inherit;text-decoration:none}' + '.credit a:hover,.credit a:focus-visible{text-decoration:underline}' + ':host([data-filled][data-credit]) .credit{display:block}' +
  // Exports must ship JUST the image — no hover controls, no credit chip
  // (the host marks <html data-om-exporting> for the capture window; the
  // page-level hide script can't reach shadow DOM, this rule can).
  ':host-context([data-om-exporting]) .ctl,' + ':host-context([data-om-exporting]) .credit{display:none !important}' +
  // Attribution error tile: REPLACES the photo when an Unsplash src has
  // no credit attribute — rendering the photo uncredited is the terms
  // violation, so the photo must not appear at all.
  // Calm and neutral on purpose (review feedback): the tile informs the
  // user; the fix instructions are machine-facing (usage docblock, tool
  // description, and the turn-end scan's bounce copy name the attributes
  // for the agent).
  '.attr-error{position:absolute;inset:0;display:none;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  background:#f2f1ef;color:#6e6c66;user-select:none;' + '  font:13px/1.45 system-ui,-apple-system,sans-serif}' + '.attr-error svg{opacity:.55}' + '.attr-error .cap{max-width:92%;font-weight:500;letter-spacing:.01em}' + ':host([data-attribution-error]) .attr-error{display:flex}' + ':host([data-attribution-error]) .ring{display:none}';
  const icon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>' + '<path d="m21 15-5-5L5 21"/></svg>';
  const warnIcon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/>' + '<path d="M12 9v4"/><path d="M12 17h.01"/></svg>';
  class ImageSlot extends HTMLElement {
    static get observedAttributes() {
      return ['shape', 'radius', 'mask', 'fit', 'placeholder', 'src', 'id', 'credit', 'credit-href'];
    }

    /** Duplicate-slide hook (called by deck-stage, see its
     *  _remintDuplicateIds): copy this id's stored image, if any, under a
     *  freshly minted key and return that key — so a duplicated slide's
     *  slot keeps its dropped photo instead of reverting to the
     *  placeholder. 'isFree' is the caller's uniqueness check (document
     *  ids); candidates must ALSO be unused in the sidecar, which can
     *  hold keys from other pages sharing the project root. (An EMPTY
     *  slot on another page leaves no sidecar entry, so its id is not
     *  detectable here — a minted key can collide with it and that slot
     *  would show this photo. Same blast radius as two pages reusing an
     *  id by hand, which the shared sidecar already permits.) Returns null
     *  when no id could be minted (caller strips the id, today's
     *  behavior). */
    static cloneSlot(fromId, isFree) {
      if (typeof fromId !== 'string' || !fromId) return null;
      // Pre-hydration the store can't veto candidates or source the copy
      // — degrade to the strip (today's behavior) rather than mint
      // against keys we can't see yet. Any rendered (= droppable) slot
      // means load() has already settled.
      if (!loaded) return null;
      const stem = fromId.replace(/-\d+$/, '') || fromId;
      for (let n = 2; n < 100; n++) {
        const toId = stem + '-' + n;
        if (toId === fromId) continue;
        if (slots[toId] !== undefined) {
          // Reuse a key holding this exact value (bytes AND crop) if no
          // live element here owns it — a duplicate op the host refused
          // after minting leaves such a key behind, and reusing keeps
          // refused retries from accumulating one orphaned copy per
          // attempt. Full equality (not just bytes) so a byte-identical
          // key another PAGE owns with its own crop is stepped past, not
          // adopted or rewritten. (Entries without .u never match.)
          const prev = getSlot(toId);
          const cur = getSlot(fromId);
          if (!(prev && cur && prev.u && prev.u === cur.u && prev.s === cur.s && prev.x === cur.x && prev.y === cur.y && (typeof isFree !== 'function' || isFree(toId)))) continue;
          return toId;
        }
        if (typeof isFree === 'function' && !isFree(toId)) continue;
        const v = getSlot(fromId);
        if (v) setSlot(toId, Object.assign({}, v));
        return toId;
      }
      return null;
    }
    constructor() {
      super();
      // clonable: rail thumbnails deep-clone slides and carry this shadow
      // along; reuse an already-cloned root so upgrade-after-clone works.
      // (Deliberately NOT serializable — a getHTML consumer would embed
      // multi-MB sidecar data-URLs into serialized page HTML.)
      const root = this.shadowRoot || this.attachShadow({
        mode: 'open',
        clonable: true
      });
      // .spill and .ctl sit OUTSIDE .frame so overflow:hidden + border-radius
      // on the frame (circle, pill, rounded) can't clip them.
      root.innerHTML = '<style>' + stylesheet + '</style>' + '<div class="frame" part="frame">' + '  <img part="image" alt="" draggable="false" style="display:none">' + '  <div class="empty" part="empty">' + icon + '    <div class="cap"></div>' + '    <div class="sub">or <u>browse files</u></div></div>' + '  <div class="attr-error" part="attribution-error">' + warnIcon + '    <div class="cap">This photo needs attribution</div></div>' + '  <div class="ring" part="ring"></div>' + '</div>' +
      // Outside .frame, like .spill/.ctl — the frame's overflow:hidden +
      // border-radius/clip-path would cut the credit off on circle/pill/mask.
      // A SPAN, not an <a>: the prescribed Unsplash credit holds two links
      // (photographer + Unsplash), built per-render in _render().
      '<span class="credit" part="credit"></span>' + '<div class="spill" popover="manual" data-dc-edit-transparent>' + '  <img class="ghost" alt="" draggable="false">' + '  <div class="handle" data-c="nw"></div><div class="handle" data-c="ne"></div>' + '  <div class="handle" data-c="sw"></div><div class="handle" data-c="se"></div>' + '</div>' +
      // data-dc-edit-transparent: the DC editor's edit-mode picker lets
      // clicks through for chrome marked with it (EDIT_TRANSPARENT_SEL)
      // — without it, Replace/Edit clicks in Edit mode are swallowed by
      // element selection and the controls look dead.
      '<div class="ctl" popover="manual" data-dc-edit-transparent><button data-act="replace" title="Replace image">Replace</button>' + '  <button data-act="edit" title="Reframe image">Edit</button></div>' + '<input type="file" accept="' + ACCEPT.join(',') + '" hidden>';
      this._frame = root.querySelector('.frame');
      this._ring = root.querySelector('.ring');
      this._img = root.querySelector('.frame img');
      this._empty = root.querySelector('.empty');
      this._cap = root.querySelector('.cap');
      this._sub = root.querySelector('.sub');
      this._spill = root.querySelector('.spill');
      this._ctl = root.querySelector('.ctl');
      this._credit = root.querySelector('.credit');
      this._attrError = root.querySelector('.attr-error');
      // Credit clicks open the link, not browse/reframe.
      this._credit.addEventListener('click', e => e.stopPropagation());
      this._credit.addEventListener('dblclick', e => e.stopPropagation());
      this._ghost = root.querySelector('.ghost');
      this._err = null;
      this._input = root.querySelector('input');
      this._depth = 0;
      this._gen = 0;
      this._view = {
        s: 1,
        x: 0,
        y: 0
      };
      this._subFn = () => this._render();
      // Shadow-DOM listeners live with the shadow DOM — bound once here so
      // disconnect/reconnect (e.g. React remount) doesn't stack handlers.
      this._empty.addEventListener('click', () => this._input.click());
      root.addEventListener('click', e => {
        const act = e.target && e.target.getAttribute && e.target.getAttribute('data-act');
        if (!act) return;
        // The hidden controls are opacity-0 but still tabbable — without
        // this gate a keyboard user could drive them on a read-only share
        // link (mirrors the dblclick handler's editable gate).
        if (!this.hasAttribute('data-editable')) return;
        if (act === 'replace') {
          this._exitReframe(true);
          // Host-owned picker (Unsplash modal; it also offers local import).
          this.dispatchEvent(new CustomEvent('image-slot:pick', {
            bubbles: true,
            composed: true,
            detail: {
              id: this.id || null
            }
          }));
        }
        if (act === 'edit') {
          if (!this._reframes()) return;
          if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
        }
      });
      this._input.addEventListener('change', () => {
        const f = this._input.files && this._input.files[0];
        if (f) this._ingest(f);
        this._input.value = '';
      });
      // naturalWidth/Height aren't known until load — re-apply so the cover
      // baseline is computed from real dimensions, not the 100%×100% fallback.
      this._img.addEventListener('load', () => this._applyView());
      // Gated only on editable — any filled slot can be repositioned/scaled,
      // regardless of fit. Share links (no writeFile) stay static.
      this.addEventListener('dblclick', e => {
        if (!this.hasAttribute('data-editable') || !this._reframes()) return;
        e.preventDefault();
        if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
      });
      // Pan + resize both originate on the spill layer. A handle pointerdown
      // drives an aspect-locked resize anchored at the opposite corner; any
      // other pointerdown on the spill pans. Offsets are frame-% so a
      // reframed slot survives responsive resize / PPTX export.
      this._spill.addEventListener('pointerdown', e => {
        if (e.button !== 0 || !this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        e.stopPropagation();
        this._spill.setPointerCapture(e.pointerId);
        const rect = this.getBoundingClientRect();
        const fw = rect.width || 1,
          fh = rect.height || 1;
        const corner = e.target.getAttribute && e.target.getAttribute('data-c');
        let move;
        if (corner) {
          // Resize about the OPPOSITE corner. Viewport-px throughout (rect
          // fw/fh, not clientWidth) so the math survives a transform:scale()
          // ancestor — deck_stage renders slides scaled-to-fit.
          const iw = this._img.naturalWidth || 1,
            ih = this._img.naturalHeight || 1;
          const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
          const base = contain ? Math.min(fw / iw, fh / ih) : Math.max(fw / iw, fh / ih);
          const sx = corner.includes('e') ? 1 : -1;
          const sy = corner.includes('s') ? 1 : -1;
          const s0 = this._view.s;
          const w0 = iw * base * s0,
            h0 = ih * base * s0;
          const cx0 = (50 + this._view.x) / 100 * fw;
          const cy0 = (50 + this._view.y) / 100 * fh;
          const ox = cx0 - sx * w0 / 2,
            oy = cy0 - sy * h0 / 2;
          const diag0 = Math.hypot(w0, h0);
          const ux = sx * w0 / diag0,
            uy = sy * h0 / diag0;
          move = ev => {
            const proj = (ev.clientX - rect.left - ox) * ux + (ev.clientY - rect.top - oy) * uy;
            const s = clampS(s0 * proj / diag0);
            const d = diag0 * s / s0;
            this._view.s = s;
            this._view.x = (ox + ux * d / 2) / fw * 100 - 50;
            this._view.y = (oy + uy * d / 2) / fh * 100 - 50;
            this._clampView();
            this._applyView();
          };
        } else {
          this.setAttribute('data-panning', '');
          const start = {
            px: e.clientX,
            py: e.clientY,
            x: this._view.x,
            y: this._view.y
          };
          move = ev => {
            this._view.x = start.x + (ev.clientX - start.px) / fw * 100;
            this._view.y = start.y + (ev.clientY - start.py) / fh * 100;
            this._clampView();
            this._applyView();
          };
        }
        const up = () => {
          try {
            this._spill.releasePointerCapture(e.pointerId);
          } catch {}
          this._spill.removeEventListener('pointermove', move);
          this._spill.removeEventListener('pointerup', up);
          this._spill.removeEventListener('pointercancel', up);
          this.removeAttribute('data-panning');
          this._dragUp = null;
        };
        // Stashed so _exitReframe (Escape / outside-click mid-drag) can
        // tear the capture + listeners down synchronously.
        this._dragUp = up;
        this._spill.addEventListener('pointermove', move);
        this._spill.addEventListener('pointerup', up);
        this._spill.addEventListener('pointercancel', up);
      });
      // Wheel zoom stays available inside reframe mode as a trackpad nicety —
      // zooms toward the cursor (offset' = cursor·(1-k) + offset·k).
      this.addEventListener('wheel', e => {
        if (!this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        const r = this.getBoundingClientRect();
        const cx = (e.clientX - r.left) / r.width * 100 - 50;
        const cy = (e.clientY - r.top) / r.height * 100 - 50;
        const prev = this._view.s;
        const next = clampS(prev * Math.pow(1.0015, -e.deltaY));
        if (next === prev) return;
        const k = next / prev;
        this._view.s = next;
        this._view.x = cx * (1 - k) + this._view.x * k;
        this._view.y = cy * (1 - k) + this._view.y * k;
        this._clampView();
        this._applyView();
      }, {
        passive: false
      });
    }
    connectedCallback() {
      // Warn once per page — an id-less slot works for the session but
      // cannot persist, and two id-less slots would share nothing.
      if (!this.id && !ImageSlot._warned) {
        ImageSlot._warned = true;
        console.warn('<image-slot> without an id will not persist its dropped image.');
      }
      this.addEventListener('dragenter', this);
      this.addEventListener('dragover', this);
      this.addEventListener('dragleave', this);
      this.addEventListener('drop', this);
      subs.add(this._subFn);
      // The host may inject window.omelette.writeFile AFTER the first render;
      // re-render on hover so the editable-gated controls reliably appear.
      this.addEventListener('pointerenter', this._subFn);
      // width%/height% in _applyView encode the frame aspect at call time —
      // a host resize (responsive grid, pane divider) would stretch the
      // image until the next _render. Re-render on size change: _render()
      // re-seeds _view from stored before clamp/apply, so a shrink→grow
      // cycle round-trips instead of ratcheting x/y toward the narrower
      // frame's clamp range.
      this._ro = new ResizeObserver(() => this._render());
      this._ro.observe(this);
      load();
      this._render();
    }
    disconnectedCallback() {
      subs.delete(this._subFn);
      this.removeEventListener('pointerenter', this._subFn);
      this.removeEventListener('dragenter', this);
      this.removeEventListener('dragover', this);
      this.removeEventListener('dragleave', this);
      this.removeEventListener('drop', this);
      if (this._ro) {
        this._ro.disconnect();
        this._ro = null;
      }
      // commit=false: a disconnect is not a user intent — committing here
      // would persist whatever half-finished drag a React remount or DOM
      // splice happened to interrupt. Deliberate exits commit on their own
      // paths (Escape/click-out/toggle), and unloads commit via pagehide.
      this._exitReframe(false);
    }
    _enterReframe() {
      if (this.hasAttribute('data-reframe')) return;
      this.setAttribute('data-reframe', '');
      this._signalReframe(true);
      // Best-effort commit when the document unloads mid-reframe (a host
      // navigation racing the enter signal, a manual reload, tab close):
      // the sidecar write rides the host bridge, which outlives this
      // document, so the crop survives even though the mode dies with the
      // DOM. Held on the instance so _exitReframe detaches exactly what
      // was attached.
      this._pagehide = () => {
        this._exitReframe(true);
        flushNow();
      };
      window.addEventListener('pagehide', this._pagehide);
      // Promote spill to the top layer, then keep it pinned over the frame:
      // scroll/resize cover the common cases, and a per-frame rect check
      // catches layout shifts that fire neither (an image above finishing
      // load, streamed DOM pushing the slot down, an ancestor transform
      // change) so the overlay can't detach from the frame.
      try {
        this._spill.showPopover();
      } catch {}
      // After the spill, so the controls stack above it in the top layer.
      try {
        this._ctl.showPopover();
      } catch {}
      this._reposition = () => {
        if (this.hasAttribute('data-reframe')) this._applyView();
      };
      window.addEventListener('scroll', this._reposition, true);
      window.addEventListener('resize', this._reposition);
      this._lastRect = '';
      this._watch = () => {
        if (!this.hasAttribute('data-reframe')) return;
        const r = this.getBoundingClientRect();
        const key = r.left + ',' + r.top + ',' + r.width + ',' + r.height;
        if (key !== this._lastRect) {
          this._lastRect = key;
          this._applyView();
        }
        this._watchId = requestAnimationFrame(this._watch);
      };
      this._watchId = requestAnimationFrame(this._watch);
      this._applyView();
      // Close on click outside (the spill handler stopPropagation()s so
      // in-image drags don't reach this) and on Escape. Listeners are held
      // on the instance so _exitReframe / disconnectedCallback can detach
      // exactly what was attached.
      this._outside = e => {
        if (e.composedPath && e.composedPath().includes(this)) return;
        this._exitReframe(true);
      };
      this._esc = e => {
        if (e.key === 'Escape') this._exitReframe(true);
      };
      document.addEventListener('pointerdown', this._outside, true);
      document.addEventListener('keydown', this._esc, true);
    }
    _exitReframe(commit) {
      if (!this.hasAttribute('data-reframe')) return;
      if (this._dragUp) this._dragUp();
      this.removeAttribute('data-reframe');
      this.removeAttribute('data-panning');
      if (this._outside) document.removeEventListener('pointerdown', this._outside, true);
      if (this._esc) document.removeEventListener('keydown', this._esc, true);
      this._outside = this._esc = null;
      if (this._reposition) {
        window.removeEventListener('scroll', this._reposition, true);
        window.removeEventListener('resize', this._reposition);
        this._reposition = null;
      }
      if (this._watchId) {
        cancelAnimationFrame(this._watchId);
        this._watchId = 0;
      }
      if (this._pagehide) {
        window.removeEventListener('pagehide', this._pagehide);
        this._pagehide = null;
      }
      try {
        this._spill.hidePopover();
      } catch {}
      try {
        this._ctl.hidePopover();
      } catch {}
      this._ctl.style.left = '';
      this._ctl.style.top = '';
      if (commit) this._commitView();
      this._signalReframe(false);
    }

    // Reframe state lives only in this DOM until commit, invisible to the
    // host's dirty signals — announce enter/exit so the host can hold
    // auto-reloads for exactly the gesture (the guest bundle forwards
    // image-slot:reframe to the host as imageSlotReframe). Dispatched on
    // the element (composed, so it escapes shadow roots) while connected;
    // a disconnected exit (disconnectedCallback) falls back to document so
    // the host still hears it.
    _signalReframe(active) {
      const target = this.isConnected ? this : document;
      target.dispatchEvent(new CustomEvent('image-slot:reframe', {
        bubbles: true,
        composed: true,
        detail: {
          active: active,
          id: this.id || null
        }
      }));
    }

    // Public: host's "Import from computer" calls this to run local browse.
    openFilePicker() {
      this._exitReframe(true);
      this._input.click();
    }
    attributeChangedCallback() {
      if (this.shadowRoot) this._render();
    }

    // handleEvent — one listener object for all four drag events keeps the
    // add/remove symmetric and the depth counter correct.
    handleEvent(e) {
      if (e.type === 'dragenter' || e.type === 'dragover') {
        // Without preventDefault the browser never fires 'drop'.
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
        if (e.type === 'dragenter') this._depth++;
        this.setAttribute('data-over', '');
      } else if (e.type === 'dragleave') {
        // dragenter/leave fire for every descendant crossing — count depth
        // so hovering the icon inside the empty state doesn't flicker.
        if (--this._depth <= 0) {
          this._depth = 0;
          this.removeAttribute('data-over');
        }
      } else if (e.type === 'drop') {
        e.preventDefault();
        e.stopPropagation();
        this._depth = 0;
        this.removeAttribute('data-over');
        const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (f) this._ingest(f);
      }
    }
    async _ingest(file) {
      this._setError(null);
      if (!file || ACCEPT.indexOf(file.type) < 0) {
        this._setError('Drop a PNG, JPEG, WebP, or AVIF image.');
        return;
      }
      // toDataUrl can take hundreds of ms on a large photo. A Clear or a
      // newer drop during that window would be clobbered when this await
      // resumes — bump + capture a generation so stale encodes bail.
      const gen = ++this._gen;
      try {
        const w = this.clientWidth || this.offsetWidth || MAX_DIM;
        const url = await toDataUrl(file, w);
        if (gen !== this._gen) return;
        // Only exit reframe once the new image is in hand — a rejected type
        // or decode failure leaves the in-progress crop untouched.
        this._exitReframe(false);
        const val = {
          u: url,
          s: 1,
          x: 0,
          y: 0
        };
        setSlot(this.id || '', val);
        // Keep a session-local copy for id-less slots so the drop still
        // shows, even though it cannot persist.
        if (!this.id) {
          this._local = val;
          this._render();
        }
      } catch (err) {
        if (gen !== this._gen) return;
        this._setError('Could not read that image.');
        console.warn('<image-slot> ingest failed:', err);
      }
    }
    _setError(msg) {
      if (this._err) {
        this._err.remove();
        this._err = null;
      }
      if (!msg) return;
      const d = document.createElement('div');
      d.className = 'err';
      d.textContent = msg;
      this.shadowRoot.appendChild(d);
      this._err = d;
      setTimeout(() => {
        if (this._err === d) {
          d.remove();
          this._err = null;
        }
      }, 3000);
    }

    // Reframing (pan/resize) is available on any filled slot — the user can
    // always reposition/scale. `fit` only sets the initial baseline (see
    // _geom): contain starts fully-visible, cover starts frame-filling.
    _reframes() {
      return this.hasAttribute('data-filled');
    }

    // Baseline geometry, shared by clamp/apply/resize. `base` is the scale at
    // view-scale s=1: cover = fill the frame (overflow on the looser axis),
    // contain = fit fully inside (letterboxed). Zooming a contain image past
    // s where it overflows naturally becomes a crop. Null until the img has
    // loaded (naturalWidth is 0 before that) or when the slot has no layout
    // box — ResizeObserver fires with a 0×0 rect under display:none, and
    // clamping against a degenerate 1×1 frame would silently pull the stored
    // pan toward zero.
    _geom() {
      const iw = this._img.naturalWidth,
        ih = this._img.naturalHeight;
      const fw = this.clientWidth,
        fh = this.clientHeight;
      if (!iw || !ih || !fw || !fh) return null;
      const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
      const base = contain ? Math.min(fw / iw, fh / ih) : Math.max(fw / iw, fh / ih);
      return {
        iw,
        ih,
        fw,
        fh,
        base
      };
    }
    _clampView() {
      // Pan range on each axis is half the overflow past the frame edge.
      const g = this._geom();
      if (!g) return;
      const mx = Math.max(0, (g.iw * g.base * this._view.s / g.fw - 1) * 50);
      const my = Math.max(0, (g.ih * g.base * this._view.s / g.fh - 1) * 50);
      this._view.x = Math.max(-mx, Math.min(mx, this._view.x));
      this._view.y = Math.max(-my, Math.min(my, this._view.y));
    }
    _applyView() {
      const g = this._geom();
      // Top-layer controls: pin to the frame's top-right in viewport px
      // (the same 8px inset as the in-frame layout; unscaled — top-layer UI
      // reads as chrome, not page content). BEFORE the geometry branch:
      // placement needs only the frame rect, and a not-yet-loaded or broken
      // src must not leave the promoted strip floating unpositioned. Gated
      // on the popover actually being open: without the Popover API,
      // showPopover() threw (swallowed in _enterReframe), .ctl stays in
      // its in-frame absolute layout, and viewport-px coordinates would
      // shove it off-frame — and matches(':popover-open') itself throws
      // there (unknown pseudo-class), hence the try/catch.
      if (this.hasAttribute('data-reframe')) {
        let onTop = false;
        try {
          onTop = this._ctl.matches(':popover-open');
        } catch {}
        if (onTop) {
          const r = this.getBoundingClientRect();
          this._ctl.style.left = r.right - 8 + 'px';
          this._ctl.style.top = r.top + 8 + 'px';
        }
      }
      if (!g) {
        // Dimensions not known yet (before img load) — centered fit so there
        // is no flash of an unpositioned image before the geometry lands.
        const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
        this._img.style.width = '100%';
        this._img.style.height = '100%';
        this._img.style.left = '50%';
        this._img.style.top = '50%';
        this._img.style.objectFit = contain ? 'contain' : 'cover';
        return;
      }
      // Baseline (cover-fill or contain-fit) × view scale. Width/height and
      // left/top are all frame-% — depends only on the frame aspect ratio, so
      // a responsive resize keeps the same crop. The spill layer mirrors the
      // same box so its corners = image corners.
      const k = g.base * this._view.s;
      const w = g.iw * k / g.fw * 100 + '%';
      const h = g.ih * k / g.fh * 100 + '%';
      const l = 50 + this._view.x + '%';
      const t = 50 + this._view.y + '%';
      this._img.style.width = w;
      this._img.style.height = h;
      this._img.style.left = l;
      this._img.style.top = t;
      this._img.style.objectFit = '';
      if (this.hasAttribute('data-reframe')) {
        // Top-layer spill: position in viewport px over the frame. The top
        // layer escapes ancestor transforms entirely, so EVERY term must be
        // in viewport units: getBoundingClientRect gives the frame's scaled
        // origin AND size, and the rect/layout ratio rescales the ghost —
        // sizing from layout px alone renders it 1/scale too large under a
        // scaled deck slide. Inner ghost + handles stay box-relative.
        const r = this.getBoundingClientRect();
        const sx = g.fw ? r.width / g.fw : 1;
        const sy = g.fh ? r.height / g.fh : 1;
        this._spill.style.width = g.iw * k * sx + 'px';
        this._spill.style.height = g.ih * k * sy + 'px';
        this._spill.style.left = r.left + (50 + this._view.x) / 100 * r.width + 'px';
        this._spill.style.top = r.top + (50 + this._view.y) / 100 * r.height + 'px';
      }
    }
    _commitView() {
      const v = {
        s: this._view.s,
        x: this._view.x,
        y: this._view.y
      };
      if (this._userUrl) v.u = this._userUrl;
      // Framing-only (no u) persists too so an author-src slot remembers its
      // crop; clearing the sidecar still falls through to src=.
      if (this.id) setSlot(this.id, v);else {
        this._local = v;
      }
    }
    _render() {
      // Shape / mask. Presets use border-radius so the dashed ring can
      // follow the rounded outline; clip-path is only applied for an
      // explicit `mask` (the ring is hidden there since a rectangle
      // dashed border chopped by an arbitrary polygon looks broken).
      const mask = this.getAttribute('mask');
      const shape = (this.getAttribute('shape') || 'rounded').toLowerCase();
      let radius = '';
      if (shape === 'circle') radius = '50%';else if (shape === 'pill') radius = '9999px';else if (shape === 'rounded') {
        const n = parseFloat(this.getAttribute('radius'));
        radius = (Number.isFinite(n) ? n : 12) + 'px';
      }
      this._frame.style.borderRadius = mask ? '' : radius;
      this._frame.style.clipPath = mask || '';
      this._ring.style.borderRadius = mask ? '' : radius;
      this._ring.style.display = mask ? 'none' : '';

      // Controls and reframe entry gate on this so share links stay read-only.
      const editable = !!(window.omelette && window.omelette.writeFile);
      this.toggleAttribute('data-editable', editable);
      this._sub.style.display = editable ? '' : 'none';

      // Content. The sidecar is also writable by the agent's write_file
      // tool, so its value isn't guaranteed canvas-originated — only accept
      // data:image/ URLs from it. The `src` attribute is author-controlled
      // (Claude wrote it into the HTML) so it passes through unchanged.
      let stored = this.id ? getSlot(this.id) : this._local;
      if (stored && stored.u && !/^data:image\//i.test(stored.u)) stored = null;
      const srcAttr = this.getAttribute('src') || '';
      this._userUrl = stored && stored.u || null;
      const url = this._userUrl || srcAttr;
      // Don't clobber an in-flight reframe with a store-triggered re-render.
      if (!this.hasAttribute('data-reframe')) {
        this._view = {
          s: stored && Number.isFinite(stored.s) ? clampS(stored.s) : 1,
          x: stored && Number.isFinite(stored.x) ? stored.x : 0,
          y: stored && Number.isFinite(stored.y) ? stored.y : 0
        };
      }
      this._cap.textContent = this.getAttribute('placeholder') || 'Drop an image';
      // Toggle via style.display — the [hidden] attribute alone loses to
      // the display:flex / display:block rules in the stylesheet above.
      // An Unsplash src with no credit attribute must NOT render — showing
      // the photo uncredited is the Unsplash-terms violation itself. The
      // error tile replaces the photo until the credit is written. A
      // user-dropped image is the user's own content and always renders.
      // Trimmed: credit is agent/user-editable content, and a whitespace-
      // only value must count as missing — otherwise it would suppress the
      // error tile AND render an empty credit box (no text, no links),
      // exactly the unattributed state this gate exists to prevent.
      const credit = (this.getAttribute('credit') || '').trim();
      const attrError = !!(!credit && !this._userUrl && srcAttr && isUnsplashHost(srcAttr));
      this.toggleAttribute('data-attribution-error', attrError);
      if (url && !attrError) {
        if (this._img.getAttribute('src') !== url) {
          this._img.src = url;
          this._ghost.src = url;
        }
        this._img.style.display = 'block';
        this._empty.style.display = 'none';
        this.setAttribute('data-filled', '');
        this._clampView();
        this._applyView();
      } else {
        this._img.style.display = 'none';
        this._img.removeAttribute('src');
        this._ghost.removeAttribute('src');
        // The error tile owns the blocked-photo state; .empty stays for
        // the genuinely-empty slot.
        this._empty.style.display = attrError ? 'none' : 'flex';
        this.removeAttribute('data-filled');
      }

      // Credit belongs to the author src, so a user drop hides it.
      // textContent + the http(s)-only funnel keep external strings inert.
      const showCredit = !!(url && credit && !this._userUrl && !attrError);
      this._credit.textContent = '';
      if (showCredit) {
        // Validate once (resolved against the document, http(s) only),
        // then append the terms-required utm referral params to links
        // that point back at unsplash.com.
        let href = '';
        const rawHref = this.getAttribute('credit-href') || '';
        if (rawHref) {
          try {
            const u = new URL(rawHref, document.baseURI);
            if (u.protocol === 'http:' || u.protocol === 'https:') {
              href = withReferral(u.href);
            }
          } catch {}
        }
        const mkLink = (text, linkHref) => {
          const a = document.createElement('a');
          a.setAttribute('target', '_blank');
          a.setAttribute('rel', 'noopener noreferrer');
          a.setAttribute('href', linkHref);
          a.textContent = text;
          return a;
        };
        // Unsplash's prescribed credit is TWO links — the photographer's
        // name to their profile (credit-href) and 'Unsplash' to the
        // homepage. Render that split whenever the text has the canonical
        // shape; other text keeps the legacy single-link rendering.
        const m = /^Photo by (.+) on Unsplash$/.exec(credit);
        if (m) {
          this._credit.appendChild(document.createTextNode('Photo by '));
          this._credit.appendChild(href ? mkLink(m[1], href) : document.createTextNode(m[1]));
          this._credit.appendChild(document.createTextNode(' on '));
          this._credit.appendChild(mkLink('Unsplash', UNSPLASH_HOMEPAGE_HREF));
        } else if (href) {
          this._credit.appendChild(mkLink(credit, href));
        } else {
          this._credit.textContent = credit;
        }
      }
      this.toggleAttribute('data-credit', showCredit);
    }
  }
  if (!customElements.get('image-slot')) {
    customElements.define('image-slot', ImageSlot);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/image-slot.js", error: String((e && e.message) || e) }); }

// ui_kits/storefront/Cart.jsx
try { (() => {
// Cart / drawer as a full screen. Global React.
const {
  Button: CartButton,
  IconButton: CartIconBtn,
  RoastMeter: CartRoast
} = window.StancraftCoffeeDesignSystem_65aedf;
function Cart({
  items,
  setQty,
  removeItem,
  go
}) {
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 6;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--paper-100)',
      minHeight: '80vh'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 940,
      margin: '0 auto',
      padding: '48px 40px 80px'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 44,
      letterSpacing: '-0.02em',
      color: 'var(--ink-900)',
      margin: '0 0 28px'
    }
  }, "Your cart"), items.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '60px 0',
      border: '1px dashed var(--ink-200)',
      borderRadius: 'var(--radius-md)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 18,
      color: 'var(--ink-500)',
      margin: '0 0 20px'
    }
  }, "Nothing brewing yet."), /*#__PURE__*/React.createElement(CartButton, {
    variant: "primary",
    onClick: () => go('shop')
  }, "Shop the lineup")) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 320px',
      gap: 40,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 18,
      padding: '20px 0',
      borderTop: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 84,
      height: 84,
      flex: '0 0 auto',
      background: it.bag,
      borderRadius: 'var(--radius-sm)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.__resources && window.__resources.logoWhite || "../../assets/logo-stancraft-white.svg",
    alt: "",
    style: {
      width: '58%',
      opacity: 0.85
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 20,
      color: 'var(--ink-900)',
      margin: 0
    }
  }, it.name), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--ink-500)',
      margin: '2px 0 0'
    }
  }, it.origin, " \xB7 ", it.size || '12 oz')), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 18,
      color: 'var(--ink-900)'
    }
  }, "$", (it.price * it.qty).toFixed(2))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(CartIconBtn, {
    label: "Decrease",
    size: "sm",
    variant: "outline",
    onClick: () => setQty(i, Math.max(1, it.qty - 1))
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "minus"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 16,
      minWidth: 20,
      textAlign: 'center'
    }
  }, it.qty), /*#__PURE__*/React.createElement(CartIconBtn, {
    label: "Increase",
    size: "sm",
    variant: "outline",
    onClick: () => setQty(i, it.qty + 1)
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "plus"
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: () => removeItem(i),
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 12,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--ink-300)'
    }
  }, "Remove")))))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-hairline)',
      borderRadius: 'var(--radius-md)',
      padding: 24,
      position: 'sticky',
      top: 90
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 13,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--ink-900)',
      margin: '0 0 18px'
    }
  }, "Summary"), [['Subtotal', subtotal], ['Shipping', shipping]].map(([l, v], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontFamily: 'var(--font-body)',
      fontSize: 16,
      color: 'var(--ink-700)',
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", null, l), /*#__PURE__*/React.createElement("span", null, v === 0 && l === 'Shipping' ? 'Free' : '$' + v.toFixed(2)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      borderTop: '1px solid var(--border-hairline)',
      marginTop: 12,
      paddingTop: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 16,
      color: 'var(--ink-900)'
    }
  }, "Total"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 22,
      color: 'var(--ink-900)'
    }
  }, "$", (subtotal + shipping).toFixed(2))), /*#__PURE__*/React.createElement(CartButton, {
    variant: "primary",
    fullWidth: true,
    style: {
      marginTop: 20
    }
  }, "Checkout"), subtotal < 50 && subtotal > 0 && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--yellow-700)',
      margin: '12px 0 0',
      textAlign: 'center'
    }
  }, "$", (50 - subtotal).toFixed(2), " more for free shipping")))));
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/Cart.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/Chrome.jsx
try { (() => {
// Storefront chrome: Header + Footer. Global React (loaded via Babel in index.html).
const {
  IconButton
} = window.StancraftCoffeeDesignSystem_65aedf;
function Header({
  route,
  go,
  cartCount
}) {
  const links = [['shop', 'Shop'], ['home', 'Our craft'], ['home', 'Wholesale'], ['home', 'Journal']];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 40px',
      background: 'var(--paper-100)',
      borderBottom: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.__resources && window.__resources.logoDark || "../../assets/logo-stancraft.svg",
    alt: "Stancraft Coffee Co",
    onClick: () => go('home'),
    style: {
      height: 26,
      cursor: 'pointer'
    }
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 30
    }
  }, links.map(([r, label], i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    onClick: () => go(r),
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 13,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: route === r && r === 'shop' ? 'var(--accent)' : 'var(--ink-900)',
      cursor: 'pointer',
      textDecoration: 'none'
    }
  }, label))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    label: "Search",
    variant: "ghost"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "search"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    label: "Cart",
    variant: "outline",
    onClick: () => go('cart')
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "shopping-bag"
  })), cartCount > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: -6,
      right: -6,
      minWidth: 18,
      height: 18,
      padding: '0 5px',
      borderRadius: 999,
      background: 'var(--accent)',
      color: '#fff',
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 11,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, cartCount))));
}
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--espresso-900)',
      color: 'var(--paper-200)',
      padding: '54px 40px 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 32,
      maxWidth: 1200,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 300
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.__resources && window.__resources.logoWhite || "../../assets/logo-stancraft-white.svg",
    alt: "Stancraft",
    style: {
      height: 24,
      marginBottom: 16
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      lineHeight: 1.6,
      color: 'var(--ink-300)',
      margin: 0
    }
  }, "Bean roasting & distribution for people who care what's in the cup. Whole bean only.")), [['Coffee', ['Shop all', 'Espresso', 'Filter', 'Cold brew', 'Decaf']], ['Company', ['Our craft', 'Sourcing', 'Wholesale', 'Journal']], ['Help', ['Shipping', 'Brew guides', 'Contact']]].map(([h, items], i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 12,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: 'var(--blue-500)',
      margin: '0 0 14px'
    }
  }, h), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 9
    }
  }, items.map((it, j) => /*#__PURE__*/React.createElement("li", {
    key: j,
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      color: 'var(--paper-200)'
    }
  }, it)))))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 11,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--ink-500)',
      marginTop: 40,
      textAlign: 'center'
    }
  }, "\xA9 2026 Stancraft Coffee Co \xB7 Roasted to order"));
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/Chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/Home.jsx
try { (() => {
// Home screen. Global React.
const {
  Button: SButton,
  Badge: SBadge,
  ProductCard: SProductCard,
  FlavorTag: SFlavorTag
} = window.StancraftCoffeeDesignSystem_65aedf;
function Home({
  go,
  addToCart
}) {
  const P = window.STANCRAFT_PRODUCTS;
  const featured = [P.find(p => p.id === 'rotator'), P.find(p => p.id === 'nightshift'), P.find(p => p.id === 'dawn-patrol'), P.find(p => p.id === 'featherweight')];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--espresso-900)',
      color: 'var(--paper-100)',
      padding: '96px 40px 104px',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      position: 'relative',
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 13,
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color: 'var(--yellow-500)',
      margin: '0 0 22px'
    }
  }, "Small-batch roasters \xB7 Est. Stancraft"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 76,
      lineHeight: 0.98,
      letterSpacing: '-0.025em',
      margin: 0,
      maxWidth: 16 + 'ch'
    }
  }, "Coffee for the", /*#__PURE__*/React.createElement("br", null), "particular."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 20,
      lineHeight: 1.55,
      color: 'var(--paper-200)',
      maxWidth: '52ch',
      margin: '28px 0 36px'
    }
  }, "Thirteen coffees, each with a reason to exist. Roasted to protect the cup, described in plain language, and shipped as whole bean \u2014 the way a connoisseur wants them."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(SButton, {
    variant: "primary",
    size: "lg",
    onClick: () => go('shop')
  }, "Shop the lineup"), /*#__PURE__*/React.createElement(SButton, {
    variant: "outline",
    size: "lg",
    onClick: () => go('shop'),
    style: {
      color: 'var(--paper-100)',
      borderColor: 'var(--paper-100)'
    }
  }, "Our craft")))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--paper-100)',
      padding: '72px 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      marginBottom: 30
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 12,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: 'var(--accent)',
      margin: '0 0 8px'
    }
  }, "This week"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 38,
      letterSpacing: '-0.02em',
      color: 'var(--ink-900)',
      margin: 0
    }
  }, "On the roaster")), /*#__PURE__*/React.createElement("a", {
    onClick: () => go('shop'),
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 13,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--ink-900)',
      cursor: 'pointer'
    }
  }, "All 13 \u2192")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 22
    }
  }, featured.map(p => /*#__PURE__*/React.createElement(SProductCard, {
    key: p.id,
    name: p.name,
    origin: p.origin,
    price: p.price,
    roast: p.roast,
    notes: p.notes,
    bagColor: p.bag,
    badge: p.smallBatch ? {
      label: 'Small batch',
      tone: 'accent'
    } : p.decaf ? {
      label: 'Decaf',
      tone: 'decaf'
    } : null,
    onAdd: () => addToCart(p),
    style: {
      cursor: 'pointer'
    }
  }))))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--paper-300)',
      padding: '76px 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 900,
      margin: '0 auto',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 12,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: 'var(--espresso-500)',
      margin: '0 0 14px'
    }
  }, "How we describe flavor"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 40,
      letterSpacing: '-0.02em',
      color: 'var(--ink-900)',
      margin: '0 0 18px'
    }
  }, "No hints of. No notes of. Just what it drinks like."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 18,
      lineHeight: 1.6,
      color: 'var(--ink-700)',
      margin: '0 0 28px'
    }
  }, "Every coffee is tagged with two to four honest notes, grouped by flavor family. It is a shorthand, not theater \u2014 so you can find the cup you actually want."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 10,
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(SFlavorTag, {
    note: "Blackberry",
    family: "fruit"
  }), /*#__PURE__*/React.createElement(SFlavorTag, {
    note: "Jasmine",
    family: "floral"
  }), /*#__PURE__*/React.createElement(SFlavorTag, {
    note: "Lemon zest",
    family: "citrus"
  }), /*#__PURE__*/React.createElement(SFlavorTag, {
    note: "Caramel",
    family: "sweet"
  }), /*#__PURE__*/React.createElement(SFlavorTag, {
    note: "Dark chocolate",
    family: "chocolate"
  }), /*#__PURE__*/React.createElement(SFlavorTag, {
    note: "Toasted almond",
    family: "nutty"
  }), /*#__PURE__*/React.createElement(SFlavorTag, {
    note: "Clove",
    family: "spice"
  })))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--paper-100)',
      padding: '64px 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 40
    }
  }, [['flame', 'Roasted to order', 'We roast the week you buy and ship the next day. No warehouse staling.'], ['bean', 'Whole bean only', 'We do not grind. Fresh grinding at home is the single biggest upgrade to your cup.'], ['map-pin', 'Named origins', 'Every bag tells you the country and region. No mystery blends hiding behind a logo.']].map(([icon, h, b], i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 'var(--radius-sm)',
      background: 'var(--espresso-900)',
      color: 'var(--paper-100)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 20,
      color: 'var(--ink-900)',
      margin: '0 0 8px'
    }
  }, h), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 16,
      lineHeight: 1.55,
      color: 'var(--ink-500)',
      margin: 0
    }
  }, b))))));
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/PDP.jsx
try { (() => {
// Product detail. Global React.
const {
  Button: PdpButton,
  Badge: PdpBadge,
  Select: PdpSelect,
  RoastMeter: PdpRoast,
  BrewBadge: PdpBrew,
  FlavorTag: PdpFlavor
} = window.StancraftCoffeeDesignSystem_65aedf;
function PDP({
  product,
  addToCart,
  go
}) {
  const p = product;
  const [size, setSize] = React.useState('12 oz');
  const allMethods = ['espresso', 'filter', 'cold', 'omni'];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--paper-100)',
      minHeight: '80vh'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '28px 40px 80px'
    }
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => go('shop'),
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 12,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--ink-500)',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "arrow-left",
    style: {
      width: 14,
      height: 14
    }
  }), " Back to shop"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 56,
      marginTop: 20,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      top: 90
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '4/5',
      background: p.bag,
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-hairline)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.__resources && window.__resources.logoWhite || "../../assets/logo-stancraft-white.svg",
    alt: "",
    style: {
      width: '46%',
      opacity: 0.9
    }
  }), (p.smallBatch || p.decaf) && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 18,
      left: 18
    }
  }, /*#__PURE__*/React.createElement(PdpBadge, {
    tone: p.smallBatch ? 'accent' : 'decaf'
  }, p.smallBatch ? 'Small batch' : 'Decaf')))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 13,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: 'var(--ink-300)',
      margin: '0 0 8px'
    }
  }, p.origin), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 56,
      letterSpacing: '-0.025em',
      color: 'var(--ink-900)',
      margin: '0 0 8px',
      lineHeight: 1
    }
  }, p.name), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 19,
      lineHeight: 1.6,
      color: 'var(--ink-700)',
      margin: '18px 0 26px',
      maxWidth: '46ch'
    }
  }, p.blurb), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 22,
      padding: '24px 0',
      borderTop: '1px solid var(--border-hairline)',
      borderBottom: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 11,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--ink-300)',
      margin: '0 0 10px'
    }
  }, "Tasting notes"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8
    }
  }, p.notes.map((n, i) => /*#__PURE__*/React.createElement(PdpFlavor, {
    key: i,
    note: n.note,
    family: n.family
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 48
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 11,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--ink-300)',
      margin: '0 0 10px'
    }
  }, "Roast"), /*#__PURE__*/React.createElement(PdpRoast, {
    level: p.roast
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 11,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--ink-300)',
      margin: '0 0 10px'
    }
  }, "Best brewed"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      flexWrap: 'wrap'
    }
  }, allMethods.map(m => /*#__PURE__*/React.createElement(PdpBrew, {
    key: m,
    method: m,
    active: p.brew.includes(m)
  })))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      alignItems: 'flex-end',
      marginTop: 26
    }
  }, /*#__PURE__*/React.createElement(PdpSelect, {
    label: "Bag size",
    value: size,
    onChange: e => setSize(e.target.value),
    wrapStyle: {
      width: 160
    }
  }, /*#__PURE__*/React.createElement("option", null, "12 oz"), /*#__PURE__*/React.createElement("option", null, "2 lb"), /*#__PURE__*/React.createElement("option", null, "5 lb")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 30,
      color: 'var(--ink-900)'
    }
  }, "$", p.price.toFixed(2)))), /*#__PURE__*/React.createElement(PdpButton, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    style: {
      marginTop: 16
    },
    onClick: () => addToCart(p, size)
  }, "Add to cart \u2014 $", p.price.toFixed(2)), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--ink-500)',
      margin: '14px 0 0',
      textAlign: 'center'
    }
  }, "Roasted to order \xB7 Whole bean only \xB7 Ships in 2 days")))));
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/PDP.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/Shop.jsx
try { (() => {
// Shop screen — filterable grid of all 13. Global React.
const {
  ProductCard: ShopCard
} = window.StancraftCoffeeDesignSystem_65aedf;
function Shop({
  addToCart,
  openPDP
}) {
  const P = window.STANCRAFT_PRODUCTS;
  const [filter, setFilter] = React.useState('all');
  const filters = [['all', 'All'], ['espresso', 'Espresso'], ['filter', 'Filter'], ['cold', 'Cold brew'], ['omni', 'Omni'], ['decaf', 'Decaf']];
  const list = P.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'decaf') return p.decaf;
    return p.brew.includes(filter);
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--paper-100)',
      minHeight: '80vh'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--paper-200)',
      borderBottom: '1px solid var(--border-hairline)',
      padding: '46px 40px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 12,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: 'var(--accent)',
      margin: '0 0 8px'
    }
  }, "The lineup"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 48,
      letterSpacing: '-0.02em',
      color: 'var(--ink-900)',
      margin: '0 0 26px'
    }
  }, "Thirteen coffees."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4
    }
  }, filters.map(([f, label]) => /*#__PURE__*/React.createElement("button", {
    key: f,
    onClick: () => setFilter(f),
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 13,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      padding: '14px 18px',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      color: filter === f ? 'var(--ink-900)' : 'var(--ink-300)',
      borderBottom: filter === f ? '3px solid var(--accent)' : '3px solid transparent'
    }
  }, label))))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '40px 40px 80px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 22
    }
  }, list.map(p => /*#__PURE__*/React.createElement(ShopCard, {
    key: p.id,
    name: p.name,
    origin: p.origin,
    price: p.price,
    roast: p.roast,
    notes: p.notes,
    bagColor: p.bag,
    badge: p.smallBatch ? {
      label: 'Small batch',
      tone: 'accent'
    } : p.decaf ? {
      label: 'Decaf',
      tone: 'decaf'
    } : null,
    onAdd: e => {
      e && e.stopPropagation && e.stopPropagation();
      addToCart(p);
    },
    onClick: () => openPDP(p),
    style: {
      cursor: 'pointer'
    }
  })))));
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/Shop.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/data.js
try { (() => {
// Stancraft Coffee — catalog (13 SKUs: 1 decaf, 1 rotating small batch).
// Beans only. brew: recommended methods (espresso | filter | cold | omni).
window.STANCRAFT_PRODUCTS = [{
  id: 'nightshift',
  name: 'Nightshift',
  origin: 'Colombia · Huila',
  price: 19,
  roast: 4,
  brew: ['espresso', 'filter'],
  bag: '#3E2E22',
  notes: [{
    note: 'Dark chocolate',
    family: 'chocolate'
  }, {
    note: 'Black cherry',
    family: 'fruit'
  }, {
    note: 'Toasted almond',
    family: 'nutty'
  }],
  blurb: 'A dense, after-dark cup — cocoa and black cherry over a long, nutty finish.'
}, {
  id: 'dawn-patrol',
  name: 'Dawn Patrol',
  origin: 'Ethiopia · Guji',
  price: 21,
  roast: 2,
  brew: ['filter'],
  bag: '#C7A24A',
  notes: [{
    note: 'Jasmine',
    family: 'floral'
  }, {
    note: 'White peach',
    family: 'fruit'
  }, {
    note: 'Bergamot',
    family: 'citrus'
  }],
  blurb: 'Washed and delicate. Drinks like a cold glass of stone fruit with jasmine on the nose.'
}, {
  id: 'riverstone',
  name: 'Riverstone',
  origin: 'Guatemala · Huehuetenango',
  price: 19,
  roast: 3,
  brew: ['omni'],
  bag: '#6F4E37',
  notes: [{
    note: 'Milk chocolate',
    family: 'chocolate'
  }, {
    note: 'Hazelnut',
    family: 'nutty'
  }, {
    note: 'Brown sugar',
    family: 'sweet'
  }],
  blurb: 'The everyday workhorse — balanced, sweet, and forgiving on any brewer.'
}, {
  id: 'coldsmith',
  name: 'Coldsmith',
  origin: 'Brazil · Cerrado',
  price: 18,
  roast: 4,
  brew: ['cold'],
  bag: '#4E7BA6',
  notes: [{
    note: 'Dark chocolate',
    family: 'chocolate'
  }, {
    note: 'Peanut',
    family: 'nutty'
  }, {
    note: 'Cane sugar',
    family: 'sweet'
  }],
  blurb: 'Built for the fridge. Low acidity, heavy body, a smooth chocolate concentrate.'
}, {
  id: 'backburner',
  name: 'Backburner',
  origin: 'Colombia · Swiss Water Decaf',
  price: 20,
  roast: 3,
  brew: ['omni'],
  bag: '#F2CE5B',
  decaf: true,
  notes: [{
    note: 'Cocoa',
    family: 'chocolate'
  }, {
    note: 'Caramel',
    family: 'sweet'
  }, {
    note: 'Almond',
    family: 'nutty'
  }],
  blurb: 'Our one decaf, and we treat it like the rest — Swiss Water, full body, no penalty.'
}, {
  id: 'featherweight',
  name: 'Featherweight',
  origin: 'Kenya · Nyeri',
  price: 23,
  roast: 2,
  brew: ['filter'],
  bag: '#C0455E',
  notes: [{
    note: 'Blackcurrant',
    family: 'fruit'
  }, {
    note: 'Grapefruit',
    family: 'citrus'
  }, {
    note: 'Hibiscus',
    family: 'floral'
  }],
  blurb: 'Bright and structured. Blackcurrant snap, grapefruit lift, a tea-like tail.'
}, {
  id: 'anvil',
  name: 'Anvil',
  origin: 'Sumatra · Mandheling',
  price: 20,
  roast: 5,
  brew: ['espresso'],
  bag: '#241B14',
  notes: [{
    note: 'Toast',
    family: 'roast'
  }, {
    note: 'Clove',
    family: 'spice'
  }, {
    note: 'Bittersweet cocoa',
    family: 'chocolate'
  }],
  blurb: 'The darkest in the lineup. Smoky, savory, and unapologetically heavy.'
}, {
  id: 'meridian',
  name: 'Meridian',
  origin: 'Costa Rica · Tarrazú',
  price: 21,
  roast: 3,
  brew: ['omni'],
  bag: '#E0A83B',
  notes: [{
    note: 'Orange',
    family: 'citrus'
  }, {
    note: 'Honey',
    family: 'sweet'
  }, {
    note: 'Walnut',
    family: 'nutty'
  }],
  blurb: 'Clean and sunny — orange and honey with a tidy, walnut close.'
}, {
  id: 'tidewater',
  name: 'Tidewater',
  origin: 'Honduras · Marcala',
  price: 18,
  roast: 3,
  brew: ['cold'],
  bag: '#A9C7E0',
  notes: [{
    note: 'Maple',
    family: 'sweet'
  }, {
    note: 'Pecan',
    family: 'nutty'
  }, {
    note: 'Cocoa',
    family: 'chocolate'
  }],
  blurb: 'Mellow and syrupy over ice — maple and pecan with a soft cocoa base.'
}, {
  id: 'emberline',
  name: 'Emberline',
  origin: 'House Espresso Blend',
  price: 17,
  roast: 4,
  brew: ['espresso'],
  bag: '#6F4A33',
  notes: [{
    note: 'Dark chocolate',
    family: 'chocolate'
  }, {
    note: 'Cinnamon',
    family: 'spice'
  }, {
    note: 'Hazelnut',
    family: 'nutty'
  }],
  blurb: 'Our bar blend. Pulls thick and sweet, holds its own under milk.'
}, {
  id: 'highwire',
  name: 'Highwire',
  origin: 'Rwanda · Nyamasheke',
  price: 22,
  roast: 2,
  brew: ['filter'],
  bag: '#B08AB8',
  notes: [{
    note: 'Red currant',
    family: 'fruit'
  }, {
    note: 'Orange blossom',
    family: 'floral'
  }, {
    note: 'Lime',
    family: 'citrus'
  }],
  blurb: 'Nervy and floral — red currant and orange blossom with a citrus edge.'
}, {
  id: 'duskfall',
  name: 'Duskfall',
  origin: 'Peru · Cajamarca',
  price: 19,
  roast: 4,
  brew: ['omni'],
  bag: '#4B4038',
  notes: [{
    note: 'Baker\u2019s chocolate',
    family: 'chocolate'
  }, {
    note: 'Almond',
    family: 'nutty'
  }, {
    note: 'Toast',
    family: 'roast'
  }],
  blurb: 'Comforting and even — dark chocolate and toasted almond, front to back.'
}, {
  id: 'rotator',
  name: 'The Rotator',
  origin: 'Panama · Gesha · Lot 04',
  price: 34,
  roast: 2,
  brew: ['filter'],
  bag: '#C4361F',
  smallBatch: true,
  notes: [{
    note: 'Jasmine',
    family: 'floral'
  }, {
    note: 'Mango',
    family: 'fruit'
  }, {
    note: 'Bergamot',
    family: 'citrus'
  }],
  blurb: 'The rotating chair. Whatever green floors us this month — right now, a floral Gesha. Here until it\u2019s gone.'
}];
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.BrewBadge = __ds_scope.BrewBadge;

__ds_ns.FlavorTag = __ds_scope.FlavorTag;

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.RoastMeter = __ds_scope.RoastMeter;

})();

