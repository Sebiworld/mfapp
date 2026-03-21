export const zodTranslationMap = {
  zod: {
    errors: {
      invalid_type: "{{expected}} erwartet, {{received}} erhalten",
      invalid_type_received_undefined: "Darf nicht leer sein",
      invalid_type_received_null: "Darf nicht leer sein",
      invalid_literal: "Ungültiger Literalwert, {{expected}} erwartet",
      unrecognized_keys: "Unbekannte Schlüssel im Objekt: {{- keys}}",
      invalid_union: "Ungültige Eingabe",
      invalid_union_discriminator:
        "Ungültiger Diskriminatorwert, {{- options}} erwartet",
      invalid_enum_value:
        "Ungültiger Enum-Wert. {{- options}} erwartet, '{{received}}' erhalten",
      invalid_arguments: "Ungültige Funktionsargumente",
      invalid_return_type: "Ungültiger Funktionsrückgabewert",
      invalid_date: "Ungültiges Datum",
      custom: "Ungültige Eingabe",
      invalid_intersection_types:
        "Schnittmengenergebnisse konnten nicht zusammengeführt werden",
      not_multiple_of: "Diese Zahl muss ein Vielfaches von {{multipleOf}} sein",
      not_finite: "Diese Zahl muss endlich sein",
      invalid_string: {
        email: "Ungültige {{validation}}",
        url: "Ungültige {{validation}}",
        uuid: "Ungültige {{validation}}",
        cuid: "Ungültige {{validation}}",
        regex: "Ungültig",
        datetime: "Ungültiger {{validation}}",
        startsWith: 'Ungültige Eingabe: Muss mit "{{startsWith}}" beginnen',
        endsWith: 'Ungültige Eingabe: Muss mit "{{endsWith}}" enden',
      },
      too_small: {
        array: {
          exact: "Diese Liste muss genau {{minimum}} Element(e) enthalten",
          inclusive:
            "Diese Liste muss mindestens {{minimum}} Element(e) enthalten",
          not_inclusive:
            "Diese Liste muss mehr als {{minimum}} Element(e) enthalten",
        },
        string: {
          exact: "Dieser Text muss genau {{minimum}} Zeichen enthalten",
          inclusive:
            "Dieser Text muss mindestens {{minimum}} Zeichen enthalten",
          not_inclusive:
            "Dieser Text muss mehr als {{minimum}} Zeichen enthalten",
        },
        number: {
          exact: "Diese Zahl muss genau {{minimum}} sein",
          inclusive: "Diese Zahl muss größer oder gleich {{minimum}} sein",
          not_inclusive: "Diese Zahl muss größer als {{minimum}} sein",
        },
        set: {
          exact: "Ungültige Eingabe",
          inclusive: "Ungültige Eingabe",
          not_inclusive: "Ungültige Eingabe",
        },
        date: {
          exact: "Dieses Datum muss genau {{- minimum, datetime}} sein",
          inclusive:
            "Dieses Datum muss größer oder gleich {{- minimum, datetime}} sein",
          not_inclusive:
            "Dieses Datum muss größer als {{- minimum, datetime}} sein",
        },
      },
      too_big: {
        array: {
          exact: "Diese Liste muss genau {{maximum}} Element(e) enthalten",
          inclusive:
            "Diese Liste darf höchstens {{maximum}} Element(e) enthalten",
          not_inclusive:
            "Diese Liste muss weniger als {{maximum}} Element(e) enthalten",
        },
        string: {
          exact: "Dieser Text muss genau {{maximum}} Zeichen enthalten",
          inclusive: "Dieser Text darf höchstens {{maximum}} Zeichen enthalten",
          not_inclusive:
            "Dieser Text muss weniger als {{maximum}} Zeichen enthalten",
        },
        number: {
          exact: "Diese Zahl muss genau {{maximum}} sein",
          inclusive: "Diese Zahl muss kleiner oder gleich {{maximum}} sein",
          not_inclusive: "Diese Zahl muss kleiner als {{maximum}} sein",
        },
        set: {
          exact: "Ungültige Eingabe",
          inclusive: "Ungültige Eingabe",
          not_inclusive: "Ungültige Eingabe",
        },
        date: {
          exact: "Dieses Datum muss genau {{- maximum, datetime}} sein",
          inclusive:
            "Dieses Datum muss kleiner oder gleich {{- maximum, datetime}} sein",
          not_inclusive:
            "Dieses Datum muss kleiner als {{- maximum, datetime}} sein",
        },
      },
    },
    validations: {
      email: "E-Mail-Adresse",
      url: "URL",
      uuid: "UUID",
      cuid: "CUID",
      regex: "Regex",
      datetime: "Datums- und Uhrzeitwert",
    },
    types: {
      function: "Funktion",
      number: "Zahl",
      string: "String",
      nan: "NaN",
      integer: "Ganzzahl",
      float: "Gleitkommazahl",
      boolean: "Boolean",
      date: "Datum",
      bigint: "Bigint",
      undefined: "Undefined",
      symbol: "Symbol",
      null: "Nullwert",
      array: "Array",
      object: "Objekt",
      unknown: "Unknown",
      promise: "Promise",
      void: "Void",
      never: "Never",
      map: "Map",
      set: "Set",
    },
  },

  customZod: {
    is_empty: "Feld darf nicht leer sein",
  },
};
