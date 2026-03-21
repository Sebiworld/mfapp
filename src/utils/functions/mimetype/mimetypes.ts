interface MimetypeItem {
  mimetype: string;
  extensions?: string[];
  source?: string;
  compressible?: boolean;
  charset?: string;
}

export const mimetypes: MimetypeItem[] = [
  {
    mimetype: "application/1d-interleaved-parityfec",
    source: "iana",
  },
  {
    mimetype: "application/3gpdash-qoe-report+xml",
    source: "iana",
    charset: "UTF-8",
    compressible: true,
  },
  {
    mimetype: "application/3gpp-ims+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/3gpphal+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/3gpphalforms+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/a2l",
    source: "iana",
  },
  {
    mimetype: "application/ace+cbor",
    source: "iana",
  },
  {
    mimetype: "application/ace+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/ace-groupcomm+cbor",
    source: "iana",
  },
  {
    mimetype: "application/activemessage",
    source: "iana",
  },
  {
    mimetype: "application/activity+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/aif+cbor",
    source: "iana",
  },
  {
    mimetype: "application/aif+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/alto-cdni+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/alto-cdnifilter+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/alto-costmap+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/alto-costmapfilter+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/alto-directory+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/alto-endpointcost+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/alto-endpointcostparams+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/alto-endpointprop+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/alto-endpointpropparams+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/alto-error+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/alto-networkmap+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/alto-networkmapfilter+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/alto-propmap+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/alto-propmapparams+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/alto-tips+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/alto-tipsparams+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/alto-updatestreamcontrol+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/alto-updatestreamparams+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/aml",
    source: "iana",
  },
  {
    mimetype: "application/andrew-inset",
    source: "iana",
    extensions: ["ez"],
  },
  {
    mimetype: "application/appinstaller",
    compressible: false,
    extensions: ["appinstaller"],
  },
  {
    mimetype: "application/applefile",
    source: "iana",
  },
  {
    mimetype: "application/applixware",
    source: "apache",
    extensions: ["aw"],
  },
  {
    mimetype: "application/appx",
    compressible: false,
    extensions: ["appx"],
  },
  {
    mimetype: "application/appxbundle",
    compressible: false,
    extensions: ["appxbundle"],
  },
  {
    mimetype: "application/at+jwt",
    source: "iana",
  },
  {
    mimetype: "application/atf",
    source: "iana",
  },
  {
    mimetype: "application/atfx",
    source: "iana",
  },
  {
    mimetype: "application/atom+xml",
    source: "iana",
    compressible: true,
    extensions: ["atom"],
  },
  {
    mimetype: "application/atomcat+xml",
    source: "iana",
    compressible: true,
    extensions: ["atomcat"],
  },
  {
    mimetype: "application/atomdeleted+xml",
    source: "iana",
    compressible: true,
    extensions: ["atomdeleted"],
  },
  {
    mimetype: "application/atomicmail",
    source: "iana",
  },
  {
    mimetype: "application/atomsvc+xml",
    source: "iana",
    compressible: true,
    extensions: ["atomsvc"],
  },
  {
    mimetype: "application/atsc-dwd+xml",
    source: "iana",
    compressible: true,
    extensions: ["dwd"],
  },
  {
    mimetype: "application/atsc-dynamic-event-message",
    source: "iana",
  },
  {
    mimetype: "application/atsc-held+xml",
    source: "iana",
    compressible: true,
    extensions: ["held"],
  },
  {
    mimetype: "application/atsc-rdt+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/atsc-rsat+xml",
    source: "iana",
    compressible: true,
    extensions: ["rsat"],
  },
  {
    mimetype: "application/atxml",
    source: "iana",
  },
  {
    mimetype: "application/auth-policy+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/automationml-aml+xml",
    source: "iana",
    compressible: true,
    extensions: ["aml"],
  },
  {
    mimetype: "application/automationml-amlx+zip",
    source: "iana",
    compressible: false,
    extensions: ["amlx"],
  },
  {
    mimetype: "application/bacnet-xdd+zip",
    source: "iana",
    compressible: false,
  },
  {
    mimetype: "application/batch-smtp",
    source: "iana",
  },
  {
    mimetype: "application/bdoc",
    compressible: false,
    extensions: ["bdoc"],
  },
  {
    mimetype: "application/beep+xml",
    source: "iana",
    charset: "UTF-8",
    compressible: true,
  },
  {
    mimetype: "application/bufr",
    source: "iana",
  },
  {
    mimetype: "application/c2pa",
    source: "iana",
  },
  {
    mimetype: "application/calendar+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/calendar+xml",
    source: "iana",
    compressible: true,
    extensions: ["xcs"],
  },
  {
    mimetype: "application/call-completion",
    source: "iana",
  },
  {
    mimetype: "application/cals-1840",
    source: "iana",
  },
  {
    mimetype: "application/captive+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/cbor",
    source: "iana",
  },
  {
    mimetype: "application/cbor-seq",
    source: "iana",
  },
  {
    mimetype: "application/cccex",
    source: "iana",
  },
  {
    mimetype: "application/ccmp+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/ccxml+xml",
    source: "iana",
    compressible: true,
    extensions: ["ccxml"],
  },
  {
    mimetype: "application/cda+xml",
    source: "iana",
    charset: "UTF-8",
    compressible: true,
  },
  {
    mimetype: "application/cdfx+xml",
    source: "iana",
    compressible: true,
    extensions: ["cdfx"],
  },
  {
    mimetype: "application/cdmi-capability",
    source: "iana",
    extensions: ["cdmia"],
  },
  {
    mimetype: "application/cdmi-container",
    source: "iana",
    extensions: ["cdmic"],
  },
  {
    mimetype: "application/cdmi-domain",
    source: "iana",
    extensions: ["cdmid"],
  },
  {
    mimetype: "application/cdmi-object",
    source: "iana",
    extensions: ["cdmio"],
  },
  {
    mimetype: "application/cdmi-queue",
    source: "iana",
    extensions: ["cdmiq"],
  },
  {
    mimetype: "application/cdni",
    source: "iana",
  },
  {
    mimetype: "application/cea",
    source: "iana",
  },
  {
    mimetype: "application/cea-2018+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/cellml+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/cfw",
    source: "iana",
  },
  {
    mimetype: "application/cid-edhoc+cbor-seq",
    source: "iana",
  },
  {
    mimetype: "application/city+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/clr",
    source: "iana",
  },
  {
    mimetype: "application/clue+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/clue_info+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/cms",
    source: "iana",
  },
  {
    mimetype: "application/cnrp+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/coap-group+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/coap-payload",
    source: "iana",
  },
  {
    mimetype: "application/commonground",
    source: "iana",
  },
  {
    mimetype: "application/concise-problem-details+cbor",
    source: "iana",
  },
  {
    mimetype: "application/conference-info+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/cose",
    source: "iana",
  },
  {
    mimetype: "application/cose-key",
    source: "iana",
  },
  {
    mimetype: "application/cose-key-set",
    source: "iana",
  },
  {
    mimetype: "application/cose-x509",
    source: "iana",
  },
  {
    mimetype: "application/cpl+xml",
    source: "iana",
    compressible: true,
    extensions: ["cpl"],
  },
  {
    mimetype: "application/csrattrs",
    source: "iana",
  },
  {
    mimetype: "application/csta+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/cstadata+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/csvm+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/cu-seeme",
    source: "apache",
    extensions: ["cu"],
  },
  {
    mimetype: "application/cwl",
    source: "iana",
    extensions: ["cwl"],
  },
  {
    mimetype: "application/cwl+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/cwl+yaml",
    source: "iana",
  },
  {
    mimetype: "application/cwt",
    source: "iana",
  },
  {
    mimetype: "application/cybercash",
    source: "iana",
  },
  {
    mimetype: "application/dart",
    compressible: true,
  },
  {
    mimetype: "application/dash+xml",
    source: "iana",
    compressible: true,
    extensions: ["mpd"],
  },
  {
    mimetype: "application/dash-patch+xml",
    source: "iana",
    compressible: true,
    extensions: ["mpp"],
  },
  {
    mimetype: "application/dashdelta",
    source: "iana",
  },
  {
    mimetype: "application/davmount+xml",
    source: "iana",
    compressible: true,
    extensions: ["davmount"],
  },
  {
    mimetype: "application/dca-rft",
    source: "iana",
  },
  {
    mimetype: "application/dcd",
    source: "iana",
  },
  {
    mimetype: "application/dec-dx",
    source: "iana",
  },
  {
    mimetype: "application/dialog-info+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/dicom",
    source: "iana",
  },
  {
    mimetype: "application/dicom+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/dicom+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/dii",
    source: "iana",
  },
  {
    mimetype: "application/dit",
    source: "iana",
  },
  {
    mimetype: "application/dns",
    source: "iana",
  },
  {
    mimetype: "application/dns+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/dns-message",
    source: "iana",
  },
  {
    mimetype: "application/docbook+xml",
    source: "apache",
    compressible: true,
    extensions: ["dbk"],
  },
  {
    mimetype: "application/dots+cbor",
    source: "iana",
  },
  {
    mimetype: "application/dpop+jwt",
    source: "iana",
  },
  {
    mimetype: "application/dskpp+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/dssc+der",
    source: "iana",
    extensions: ["dssc"],
  },
  {
    mimetype: "application/dssc+xml",
    source: "iana",
    compressible: true,
    extensions: ["xdssc"],
  },
  {
    mimetype: "application/dvcs",
    source: "iana",
  },
  {
    mimetype: "application/ecmascript",
    source: "apache",
    compressible: true,
    extensions: ["ecma"],
  },
  {
    mimetype: "application/edhoc+cbor-seq",
    source: "iana",
  },
  {
    mimetype: "application/edi-consent",
    source: "iana",
  },
  {
    mimetype: "application/edi-x12",
    source: "iana",
    compressible: false,
  },
  {
    mimetype: "application/edifact",
    source: "iana",
    compressible: false,
  },
  {
    mimetype: "application/efi",
    source: "iana",
  },
  {
    mimetype: "application/elm+json",
    source: "iana",
    charset: "UTF-8",
    compressible: true,
  },
  {
    mimetype: "application/elm+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/emergencycalldata.cap+xml",
    source: "iana",
    charset: "UTF-8",
    compressible: true,
  },
  {
    mimetype: "application/emergencycalldata.comment+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/emergencycalldata.control+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/emergencycalldata.deviceinfo+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/emergencycalldata.ecall.msd",
    source: "iana",
  },
  {
    mimetype: "application/emergencycalldata.legacyesn+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/emergencycalldata.providerinfo+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/emergencycalldata.serviceinfo+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/emergencycalldata.subscriberinfo+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/emergencycalldata.veds+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/emma+xml",
    source: "iana",
    compressible: true,
    extensions: ["emma"],
  },
  {
    mimetype: "application/emotionml+xml",
    source: "iana",
    compressible: true,
    extensions: ["emotionml"],
  },
  {
    mimetype: "application/encaprtp",
    source: "iana",
  },
  {
    mimetype: "application/epp+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/epub+zip",
    source: "iana",
    compressible: false,
    extensions: ["epub"],
  },
  {
    mimetype: "application/eshop",
    source: "iana",
  },
  {
    mimetype: "application/exi",
    source: "iana",
    extensions: ["exi"],
  },
  {
    mimetype: "application/expect-ct-report+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/express",
    source: "iana",
    extensions: ["exp"],
  },
  {
    mimetype: "application/fastinfoset",
    source: "iana",
  },
  {
    mimetype: "application/fastsoap",
    source: "iana",
  },
  {
    mimetype: "application/fdf",
    source: "iana",
    extensions: ["fdf"],
  },
  {
    mimetype: "application/fdt+xml",
    source: "iana",
    compressible: true,
    extensions: ["fdt"],
  },
  {
    mimetype: "application/fhir+json",
    source: "iana",
    charset: "UTF-8",
    compressible: true,
  },
  {
    mimetype: "application/fhir+xml",
    source: "iana",
    charset: "UTF-8",
    compressible: true,
  },
  {
    mimetype: "application/fido.trusted-apps+json",
    compressible: true,
  },
  {
    mimetype: "application/fits",
    source: "iana",
  },
  {
    mimetype: "application/flexfec",
    source: "iana",
  },
  {
    mimetype: "application/font-sfnt",
    source: "iana",
  },
  {
    mimetype: "application/font-tdpfr",
    source: "iana",
    extensions: ["pfr"],
  },
  {
    mimetype: "application/font-woff",
    source: "iana",
    compressible: false,
  },
  {
    mimetype: "application/framework-attributes+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/geo+json",
    source: "iana",
    compressible: true,
    extensions: ["geojson"],
  },
  {
    mimetype: "application/geo+json-seq",
    source: "iana",
  },
  {
    mimetype: "application/geopackage+sqlite3",
    source: "iana",
  },
  {
    mimetype: "application/geoxacml+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/geoxacml+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/gltf-buffer",
    source: "iana",
  },
  {
    mimetype: "application/gml+xml",
    source: "iana",
    compressible: true,
    extensions: ["gml"],
  },
  {
    mimetype: "application/gnap-binding-jws",
    source: "iana",
  },
  {
    mimetype: "application/gnap-binding-jwsd",
    source: "iana",
  },
  {
    mimetype: "application/gnap-binding-rotation-jws",
    source: "iana",
  },
  {
    mimetype: "application/gnap-binding-rotation-jwsd",
    source: "iana",
  },
  {
    mimetype: "application/gpx+xml",
    source: "apache",
    compressible: true,
    extensions: ["gpx"],
  },
  {
    mimetype: "application/grib",
    source: "iana",
  },
  {
    mimetype: "application/gxf",
    source: "apache",
    extensions: ["gxf"],
  },
  {
    mimetype: "application/gzip",
    source: "iana",
    compressible: false,
    extensions: ["gz"],
  },
  {
    mimetype: "application/h224",
    source: "iana",
  },
  {
    mimetype: "application/held+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/hjson",
    extensions: ["hjson"],
  },
  {
    mimetype: "application/hl7v2+xml",
    source: "iana",
    charset: "UTF-8",
    compressible: true,
  },
  {
    mimetype: "application/http",
    source: "iana",
  },
  {
    mimetype: "application/hyperstudio",
    source: "iana",
    extensions: ["stk"],
  },
  {
    mimetype: "application/ibe-key-request+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/ibe-pkg-reply+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/ibe-pp-data",
    source: "iana",
  },
  {
    mimetype: "application/iges",
    source: "iana",
  },
  {
    mimetype: "application/im-iscomposing+xml",
    source: "iana",
    charset: "UTF-8",
    compressible: true,
  },
  {
    mimetype: "application/index",
    source: "iana",
  },
  {
    mimetype: "application/index.cmd",
    source: "iana",
  },
  {
    mimetype: "application/index.obj",
    source: "iana",
  },
  {
    mimetype: "application/index.response",
    source: "iana",
  },
  {
    mimetype: "application/index.vnd",
    source: "iana",
  },
  {
    mimetype: "application/inkml+xml",
    source: "iana",
    compressible: true,
    extensions: ["ink", "inkml"],
  },
  {
    mimetype: "application/iotp",
    source: "iana",
  },
  {
    mimetype: "application/ipfix",
    source: "iana",
    extensions: ["ipfix"],
  },
  {
    mimetype: "application/ipp",
    source: "iana",
  },
  {
    mimetype: "application/isup",
    source: "iana",
  },
  {
    mimetype: "application/its+xml",
    source: "iana",
    compressible: true,
    extensions: ["its"],
  },
  {
    mimetype: "application/java-archive",
    source: "iana",
    compressible: false,
    extensions: ["jar", "war", "ear"],
  },
  {
    mimetype: "application/java-serialized-object",
    source: "apache",
    compressible: false,
    extensions: ["ser"],
  },
  {
    mimetype: "application/java-vm",
    source: "apache",
    compressible: false,
    extensions: ["class"],
  },
  {
    mimetype: "application/javascript",
    source: "apache",
    charset: "UTF-8",
    compressible: true,
    extensions: ["js"],
  },
  {
    mimetype: "application/jf2feed+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/jose",
    source: "iana",
  },
  {
    mimetype: "application/jose+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/jrd+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/jscalendar+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/jscontact+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/json",
    source: "iana",
    charset: "UTF-8",
    compressible: true,
    extensions: ["json", "map"],
  },
  {
    mimetype: "application/json-patch+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/json-seq",
    source: "iana",
  },
  {
    mimetype: "application/json5",
    extensions: ["json5"],
  },
  {
    mimetype: "application/jsonml+json",
    source: "apache",
    compressible: true,
    extensions: ["jsonml"],
  },
  {
    mimetype: "application/jsonpath",
    source: "iana",
  },
  {
    mimetype: "application/jwk+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/jwk-set+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/jwt",
    source: "iana",
  },
  {
    mimetype: "application/kpml-request+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/kpml-response+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/ld+json",
    source: "iana",
    compressible: true,
    extensions: ["jsonld"],
  },
  {
    mimetype: "application/lgr+xml",
    source: "iana",
    compressible: true,
    extensions: ["lgr"],
  },
  {
    mimetype: "application/link-format",
    source: "iana",
  },
  {
    mimetype: "application/linkset",
    source: "iana",
  },
  {
    mimetype: "application/linkset+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/load-control+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/logout+jwt",
    source: "iana",
  },
  {
    mimetype: "application/lost+xml",
    source: "iana",
    compressible: true,
    extensions: ["lostxml"],
  },
  {
    mimetype: "application/lostsync+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/lpf+zip",
    source: "iana",
    compressible: false,
  },
  {
    mimetype: "application/lxf",
    source: "iana",
  },
  {
    mimetype: "application/mac-binhex40",
    source: "iana",
    extensions: ["hqx"],
  },
  {
    mimetype: "application/mac-compactpro",
    source: "apache",
    extensions: ["cpt"],
  },
  {
    mimetype: "application/macwriteii",
    source: "iana",
  },
  {
    mimetype: "application/mads+xml",
    source: "iana",
    compressible: true,
    extensions: ["mads"],
  },
  {
    mimetype: "application/manifest+json",
    source: "iana",
    charset: "UTF-8",
    compressible: true,
    extensions: ["webmanifest"],
  },
  {
    mimetype: "application/marc",
    source: "iana",
    extensions: ["mrc"],
  },
  {
    mimetype: "application/marcxml+xml",
    source: "iana",
    compressible: true,
    extensions: ["mrcx"],
  },
  {
    mimetype: "application/mathematica",
    source: "iana",
    extensions: ["ma", "nb", "mb"],
  },
  {
    mimetype: "application/mathml+xml",
    source: "iana",
    compressible: true,
    extensions: ["mathml"],
  },
  {
    mimetype: "application/mathml-content+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/mathml-presentation+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/mbms-associated-procedure-description+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/mbms-deregister+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/mbms-envelope+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/mbms-msk+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/mbms-msk-response+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/mbms-protection-description+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/mbms-reception-report+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/mbms-register+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/mbms-register-response+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/mbms-schedule+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/mbms-user-service-description+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/mbox",
    source: "iana",
    extensions: ["mbox"],
  },
  {
    mimetype: "application/media-policy-dataset+xml",
    source: "iana",
    compressible: true,
    extensions: ["mpf"],
  },
  {
    mimetype: "application/media_control+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/mediaservercontrol+xml",
    source: "iana",
    compressible: true,
    extensions: ["mscml"],
  },
  {
    mimetype: "application/merge-patch+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/metalink+xml",
    source: "apache",
    compressible: true,
    extensions: ["metalink"],
  },
  {
    mimetype: "application/metalink4+xml",
    source: "iana",
    compressible: true,
    extensions: ["meta4"],
  },
  {
    mimetype: "application/mets+xml",
    source: "iana",
    compressible: true,
    extensions: ["mets"],
  },
  {
    mimetype: "application/mf4",
    source: "iana",
  },
  {
    mimetype: "application/mikey",
    source: "iana",
  },
  {
    mimetype: "application/mipc",
    source: "iana",
  },
  {
    mimetype: "application/missing-blocks+cbor-seq",
    source: "iana",
  },
  {
    mimetype: "application/mmt-aei+xml",
    source: "iana",
    compressible: true,
    extensions: ["maei"],
  },
  {
    mimetype: "application/mmt-usd+xml",
    source: "iana",
    compressible: true,
    extensions: ["musd"],
  },
  {
    mimetype: "application/mods+xml",
    source: "iana",
    compressible: true,
    extensions: ["mods"],
  },
  {
    mimetype: "application/moss-keys",
    source: "iana",
  },
  {
    mimetype: "application/moss-signature",
    source: "iana",
  },
  {
    mimetype: "application/mosskey-data",
    source: "iana",
  },
  {
    mimetype: "application/mosskey-request",
    source: "iana",
  },
  {
    mimetype: "application/mp21",
    source: "iana",
    extensions: ["m21", "mp21"],
  },
  {
    mimetype: "application/mp4",
    source: "iana",
    extensions: ["mp4", "mpg4", "mp4s", "m4p"],
  },
  {
    mimetype: "application/mpeg4-generic",
    source: "iana",
  },
  {
    mimetype: "application/mpeg4-iod",
    source: "iana",
  },
  {
    mimetype: "application/mpeg4-iod-xmt",
    source: "iana",
  },
  {
    mimetype: "application/mrb-consumer+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/mrb-publish+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/msc-ivr+xml",
    source: "iana",
    charset: "UTF-8",
    compressible: true,
  },
  {
    mimetype: "application/msc-mixer+xml",
    source: "iana",
    charset: "UTF-8",
    compressible: true,
  },
  {
    mimetype: "application/msix",
    compressible: false,
    extensions: ["msix"],
  },
  {
    mimetype: "application/msixbundle",
    compressible: false,
    extensions: ["msixbundle"],
  },
  {
    mimetype: "application/msword",
    source: "iana",
    compressible: false,
    extensions: ["doc", "dot"],
  },
  {
    mimetype: "application/mud+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/multipart-core",
    source: "iana",
  },
  {
    mimetype: "application/mxf",
    source: "iana",
    extensions: ["mxf"],
  },
  {
    mimetype: "application/n-quads",
    source: "iana",
    extensions: ["nq"],
  },
  {
    mimetype: "application/n-triples",
    source: "iana",
    extensions: ["nt"],
  },
  {
    mimetype: "application/nasdata",
    source: "iana",
  },
  {
    mimetype: "application/news-checkgroups",
    source: "iana",
    charset: "US-ASCII",
  },
  {
    mimetype: "application/news-groupinfo",
    source: "iana",
    charset: "US-ASCII",
  },
  {
    mimetype: "application/news-transmission",
    source: "iana",
  },
  {
    mimetype: "application/nlsml+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/node",
    source: "iana",
    extensions: ["cjs"],
  },
  {
    mimetype: "application/nss",
    source: "iana",
  },
  {
    mimetype: "application/oauth-authz-req+jwt",
    source: "iana",
  },
  {
    mimetype: "application/oblivious-dns-message",
    source: "iana",
  },
  {
    mimetype: "application/ocsp-request",
    source: "iana",
  },
  {
    mimetype: "application/ocsp-response",
    source: "iana",
  },
  {
    mimetype: "application/octet-stream",
    source: "iana",
    compressible: false,
    extensions: [
      "bin",
      "dms",
      "lrf",
      "mar",
      "so",
      "dist",
      "distz",
      "pkg",
      "bpk",
      "dump",
      "elc",
      "deploy",
      "exe",
      "dll",
      "deb",
      "dmg",
      "iso",
      "img",
      "msi",
      "msp",
      "msm",
      "buffer",
    ],
  },
  {
    mimetype: "application/oda",
    source: "iana",
    extensions: ["oda"],
  },
  {
    mimetype: "application/odm+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/odx",
    source: "iana",
  },
  {
    mimetype: "application/oebps-package+xml",
    source: "iana",
    compressible: true,
    extensions: ["opf"],
  },
  {
    mimetype: "application/ogg",
    source: "iana",
    compressible: false,
    extensions: ["ogx"],
  },
  {
    mimetype: "application/ohttp-keys",
    source: "iana",
  },
  {
    mimetype: "application/omdoc+xml",
    source: "apache",
    compressible: true,
    extensions: ["omdoc"],
  },
  {
    mimetype: "application/onenote",
    source: "apache",
    extensions: ["onetoc", "onetoc2", "onetmp", "onepkg"],
  },
  {
    mimetype: "application/opc-nodeset+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/oscore",
    source: "iana",
  },
  {
    mimetype: "application/oxps",
    source: "iana",
    extensions: ["oxps"],
  },
  {
    mimetype: "application/p21",
    source: "iana",
  },
  {
    mimetype: "application/p21+zip",
    source: "iana",
    compressible: false,
  },
  {
    mimetype: "application/p2p-overlay+xml",
    source: "iana",
    compressible: true,
    extensions: ["relo"],
  },
  {
    mimetype: "application/parityfec",
    source: "iana",
  },
  {
    mimetype: "application/passport",
    source: "iana",
  },
  {
    mimetype: "application/patch-ops-error+xml",
    source: "iana",
    compressible: true,
    extensions: ["xer"],
  },
  {
    mimetype: "application/pdf",
    source: "iana",
    compressible: false,
    extensions: ["pdf"],
  },
  {
    mimetype: "application/pdx",
    source: "iana",
  },
  {
    mimetype: "application/pem-certificate-chain",
    source: "iana",
  },
  {
    mimetype: "application/pgp-encrypted",
    source: "iana",
    compressible: false,
    extensions: ["pgp"],
  },
  {
    mimetype: "application/pgp-keys",
    source: "iana",
    extensions: ["asc"],
  },
  {
    mimetype: "application/pgp-signature",
    source: "iana",
    extensions: ["sig", "asc"],
  },
  {
    mimetype: "application/pics-rules",
    source: "apache",
    extensions: ["prf"],
  },
  {
    mimetype: "application/pidf+xml",
    source: "iana",
    charset: "UTF-8",
    compressible: true,
  },
  {
    mimetype: "application/pidf-diff+xml",
    source: "iana",
    charset: "UTF-8",
    compressible: true,
  },
  {
    mimetype: "application/pkcs10",
    source: "iana",
    extensions: ["p10"],
  },
  {
    mimetype: "application/pkcs12",
    source: "iana",
  },
  {
    mimetype: "application/pkcs7-mime",
    source: "iana",
    extensions: ["p7m", "p7c"],
  },
  {
    mimetype: "application/pkcs7-signature",
    source: "iana",
    extensions: ["p7s"],
  },
  {
    mimetype: "application/pkcs8",
    source: "iana",
    extensions: ["p8"],
  },
  {
    mimetype: "application/pkcs8-encrypted",
    source: "iana",
  },
  {
    mimetype: "application/pkix-attr-cert",
    source: "iana",
    extensions: ["ac"],
  },
  {
    mimetype: "application/pkix-cert",
    source: "iana",
    extensions: ["cer"],
  },
  {
    mimetype: "application/pkix-crl",
    source: "iana",
    extensions: ["crl"],
  },
  {
    mimetype: "application/pkix-pkipath",
    source: "iana",
    extensions: ["pkipath"],
  },
  {
    mimetype: "application/pkixcmp",
    source: "iana",
    extensions: ["pki"],
  },
  {
    mimetype: "application/pls+xml",
    source: "iana",
    compressible: true,
    extensions: ["pls"],
  },
  {
    mimetype: "application/poc-settings+xml",
    source: "iana",
    charset: "UTF-8",
    compressible: true,
  },
  {
    mimetype: "application/postscript",
    source: "iana",
    compressible: true,
    extensions: ["ai", "eps", "ps"],
  },
  {
    mimetype: "application/ppsp-tracker+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/private-token-issuer-directory",
    source: "iana",
  },
  {
    mimetype: "application/private-token-request",
    source: "iana",
  },
  {
    mimetype: "application/private-token-response",
    source: "iana",
  },
  {
    mimetype: "application/problem+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/problem+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/provenance+xml",
    source: "iana",
    compressible: true,
    extensions: ["provx"],
  },
  {
    mimetype: "application/prs.alvestrand.titrax-sheet",
    source: "iana",
  },
  {
    mimetype: "application/prs.cww",
    source: "iana",
    extensions: ["cww"],
  },
  {
    mimetype: "application/prs.cyn",
    source: "iana",
    charset: "7-BIT",
  },
  {
    mimetype: "application/prs.hpub+zip",
    source: "iana",
    compressible: false,
  },
  {
    mimetype: "application/prs.implied-document+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/prs.implied-executable",
    source: "iana",
  },
  {
    mimetype: "application/prs.implied-object+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/prs.implied-object+json-seq",
    source: "iana",
  },
  {
    mimetype: "application/prs.implied-object+yaml",
    source: "iana",
  },
  {
    mimetype: "application/prs.implied-structure",
    source: "iana",
  },
  {
    mimetype: "application/prs.nprend",
    source: "iana",
  },
  {
    mimetype: "application/prs.plucker",
    source: "iana",
  },
  {
    mimetype: "application/prs.rdf-xml-crypt",
    source: "iana",
  },
  {
    mimetype: "application/prs.vcfbzip2",
    source: "iana",
  },
  {
    mimetype: "application/prs.xsf+xml",
    source: "iana",
    compressible: true,
    extensions: ["xsf"],
  },
  {
    mimetype: "application/pskc+xml",
    source: "iana",
    compressible: true,
    extensions: ["pskcxml"],
  },
  {
    mimetype: "application/pvd+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/qsig",
    source: "iana",
  },
  {
    mimetype: "application/raml+yaml",
    compressible: true,
    extensions: ["raml"],
  },
  {
    mimetype: "application/raptorfec",
    source: "iana",
  },
  {
    mimetype: "application/rdap+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/rdf+xml",
    source: "iana",
    compressible: true,
    extensions: ["rdf", "owl"],
  },
  {
    mimetype: "application/reginfo+xml",
    source: "iana",
    compressible: true,
    extensions: ["rif"],
  },
  {
    mimetype: "application/relax-ng-compact-syntax",
    source: "iana",
    extensions: ["rnc"],
  },
  {
    mimetype: "application/remote-printing",
    source: "apache",
  },
  {
    mimetype: "application/reputon+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/resource-lists+xml",
    source: "iana",
    compressible: true,
    extensions: ["rl"],
  },
  {
    mimetype: "application/resource-lists-diff+xml",
    source: "iana",
    compressible: true,
    extensions: ["rld"],
  },
  {
    mimetype: "application/rfc+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/riscos",
    source: "iana",
  },
  {
    mimetype: "application/rlmi+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/rls-services+xml",
    source: "iana",
    compressible: true,
    extensions: ["rs"],
  },
  {
    mimetype: "application/route-apd+xml",
    source: "iana",
    compressible: true,
    extensions: ["rapd"],
  },
  {
    mimetype: "application/route-s-tsid+xml",
    source: "iana",
    compressible: true,
    extensions: ["sls"],
  },
  {
    mimetype: "application/route-usd+xml",
    source: "iana",
    compressible: true,
    extensions: ["rusd"],
  },
  {
    mimetype: "application/rpki-checklist",
    source: "iana",
  },
  {
    mimetype: "application/rpki-ghostbusters",
    source: "iana",
    extensions: ["gbr"],
  },
  {
    mimetype: "application/rpki-manifest",
    source: "iana",
    extensions: ["mft"],
  },
  {
    mimetype: "application/rpki-publication",
    source: "iana",
  },
  {
    mimetype: "application/rpki-roa",
    source: "iana",
    extensions: ["roa"],
  },
  {
    mimetype: "application/rpki-signed-tal",
    source: "iana",
  },
  {
    mimetype: "application/rpki-updown",
    source: "iana",
  },
  {
    mimetype: "application/rsd+xml",
    source: "apache",
    compressible: true,
    extensions: ["rsd"],
  },
  {
    mimetype: "application/rss+xml",
    source: "apache",
    compressible: true,
    extensions: ["rss"],
  },
  {
    mimetype: "application/rtf",
    source: "iana",
    compressible: true,
    extensions: ["rtf"],
  },
  {
    mimetype: "application/rtploopback",
    source: "iana",
  },
  {
    mimetype: "application/rtx",
    source: "iana",
  },
  {
    mimetype: "application/samlassertion+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/samlmetadata+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/sarif+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/sarif-external-properties+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/sbe",
    source: "iana",
  },
  {
    mimetype: "application/sbml+xml",
    source: "iana",
    compressible: true,
    extensions: ["sbml"],
  },
  {
    mimetype: "application/scaip+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/scim+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/scvp-cv-request",
    source: "iana",
    extensions: ["scq"],
  },
  {
    mimetype: "application/scvp-cv-response",
    source: "iana",
    extensions: ["scs"],
  },
  {
    mimetype: "application/scvp-vp-request",
    source: "iana",
    extensions: ["spq"],
  },
  {
    mimetype: "application/scvp-vp-response",
    source: "iana",
    extensions: ["spp"],
  },
  {
    mimetype: "application/sdp",
    source: "iana",
    extensions: ["sdp"],
  },
  {
    mimetype: "application/secevent+jwt",
    source: "iana",
  },
  {
    mimetype: "application/senml+cbor",
    source: "iana",
  },
  {
    mimetype: "application/senml+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/senml+xml",
    source: "iana",
    compressible: true,
    extensions: ["senmlx"],
  },
  {
    mimetype: "application/senml-etch+cbor",
    source: "iana",
  },
  {
    mimetype: "application/senml-etch+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/senml-exi",
    source: "iana",
  },
  {
    mimetype: "application/sensml+cbor",
    source: "iana",
  },
  {
    mimetype: "application/sensml+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/sensml+xml",
    source: "iana",
    compressible: true,
    extensions: ["sensmlx"],
  },
  {
    mimetype: "application/sensml-exi",
    source: "iana",
  },
  {
    mimetype: "application/sep+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/sep-exi",
    source: "iana",
  },
  {
    mimetype: "application/session-info",
    source: "iana",
  },
  {
    mimetype: "application/set-payment",
    source: "iana",
  },
  {
    mimetype: "application/set-payment-initiation",
    source: "iana",
    extensions: ["setpay"],
  },
  {
    mimetype: "application/set-registration",
    source: "iana",
  },
  {
    mimetype: "application/set-registration-initiation",
    source: "iana",
    extensions: ["setreg"],
  },
  {
    mimetype: "application/sgml",
    source: "iana",
  },
  {
    mimetype: "application/sgml-open-catalog",
    source: "iana",
  },
  {
    mimetype: "application/shf+xml",
    source: "iana",
    compressible: true,
    extensions: ["shf"],
  },
  {
    mimetype: "application/sieve",
    source: "iana",
    extensions: ["siv", "sieve"],
  },
  {
    mimetype: "application/simple-filter+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/simple-message-summary",
    source: "iana",
  },
  {
    mimetype: "application/simplesymbolcontainer",
    source: "iana",
  },
  {
    mimetype: "application/sipc",
    source: "iana",
  },
  {
    mimetype: "application/slate",
    source: "iana",
  },
  {
    mimetype: "application/smil",
    source: "apache",
  },
  {
    mimetype: "application/smil+xml",
    source: "iana",
    compressible: true,
    extensions: ["smi", "smil"],
  },
  {
    mimetype: "application/smpte336m",
    source: "iana",
  },
  {
    mimetype: "application/soap+fastinfoset",
    source: "iana",
  },
  {
    mimetype: "application/soap+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/sparql-query",
    source: "iana",
    extensions: ["rq"],
  },
  {
    mimetype: "application/sparql-results+xml",
    source: "iana",
    compressible: true,
    extensions: ["srx"],
  },
  {
    mimetype: "application/spdx+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/spirits-event+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/sql",
    source: "iana",
    extensions: ["sql"],
  },
  {
    mimetype: "application/srgs",
    source: "iana",
    extensions: ["gram"],
  },
  {
    mimetype: "application/srgs+xml",
    source: "iana",
    compressible: true,
    extensions: ["grxml"],
  },
  {
    mimetype: "application/sru+xml",
    source: "iana",
    compressible: true,
    extensions: ["sru"],
  },
  {
    mimetype: "application/ssdl+xml",
    source: "apache",
    compressible: true,
    extensions: ["ssdl"],
  },
  {
    mimetype: "application/ssml+xml",
    source: "iana",
    compressible: true,
    extensions: ["ssml"],
  },
  {
    mimetype: "application/st2110-41",
    source: "iana",
  },
  {
    mimetype: "application/stix+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/stratum",
    source: "iana",
  },
  {
    mimetype: "application/swid+cbor",
    source: "iana",
  },
  {
    mimetype: "application/swid+xml",
    source: "iana",
    compressible: true,
    extensions: ["swidtag"],
  },
  {
    mimetype: "application/tamp-apex-update",
    source: "iana",
  },
  {
    mimetype: "application/tamp-apex-update-confirm",
    source: "iana",
  },
  {
    mimetype: "application/tamp-community-update",
    source: "iana",
  },
  {
    mimetype: "application/tamp-community-update-confirm",
    source: "iana",
  },
  {
    mimetype: "application/tamp-error",
    source: "iana",
  },
  {
    mimetype: "application/tamp-sequence-adjust",
    source: "iana",
  },
  {
    mimetype: "application/tamp-sequence-adjust-confirm",
    source: "iana",
  },
  {
    mimetype: "application/tamp-status-query",
    source: "iana",
  },
  {
    mimetype: "application/tamp-status-response",
    source: "iana",
  },
  {
    mimetype: "application/tamp-update",
    source: "iana",
  },
  {
    mimetype: "application/tamp-update-confirm",
    source: "iana",
  },
  {
    mimetype: "application/tar",
    compressible: true,
  },
  {
    mimetype: "application/taxii+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/td+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/tei+xml",
    source: "iana",
    compressible: true,
    extensions: ["tei", "teicorpus"],
  },
  {
    mimetype: "application/tetra_isi",
    source: "iana",
  },
  {
    mimetype: "application/thraud+xml",
    source: "iana",
    compressible: true,
    extensions: ["tfi"],
  },
  {
    mimetype: "application/timestamp-query",
    source: "iana",
  },
  {
    mimetype: "application/timestamp-reply",
    source: "iana",
  },
  {
    mimetype: "application/timestamped-data",
    source: "iana",
    extensions: ["tsd"],
  },
  {
    mimetype: "application/tlsrpt+gzip",
    source: "iana",
  },
  {
    mimetype: "application/tlsrpt+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/tm+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/tnauthlist",
    source: "iana",
  },
  {
    mimetype: "application/token-introspection+jwt",
    source: "iana",
  },
  {
    mimetype: "application/toml",
    compressible: true,
    extensions: ["toml"],
  },
  {
    mimetype: "application/trickle-ice-sdpfrag",
    source: "iana",
  },
  {
    mimetype: "application/trig",
    source: "iana",
    extensions: ["trig"],
  },
  {
    mimetype: "application/ttml+xml",
    source: "iana",
    compressible: true,
    extensions: ["ttml"],
  },
  {
    mimetype: "application/tve-trigger",
    source: "iana",
  },
  {
    mimetype: "application/tzif",
    source: "iana",
  },
  {
    mimetype: "application/tzif-leap",
    source: "iana",
  },
  {
    mimetype: "application/ubjson",
    compressible: false,
    extensions: ["ubj"],
  },
  {
    mimetype: "application/ulpfec",
    source: "iana",
  },
  {
    mimetype: "application/urc-grpsheet+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/urc-ressheet+xml",
    source: "iana",
    compressible: true,
    extensions: ["rsheet"],
  },
  {
    mimetype: "application/urc-targetdesc+xml",
    source: "iana",
    compressible: true,
    extensions: ["td"],
  },
  {
    mimetype: "application/urc-uisocketdesc+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vc",
    source: "iana",
  },
  {
    mimetype: "application/vcard+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vcard+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vemmi",
    source: "iana",
  },
  {
    mimetype: "application/vividence.scriptfile",
    source: "apache",
  },
  {
    mimetype: "application/vnd.1000minds.decision-model+xml",
    source: "iana",
    compressible: true,
    extensions: ["1km"],
  },
  {
    mimetype: "application/vnd.1ob",
    source: "iana",
  },
  {
    mimetype: "application/vnd.3gpp-prose+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp-prose-pc3a+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp-prose-pc3ach+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp-prose-pc3ch+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp-prose-pc8+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp-v2x-local-service-information",
    source: "iana",
  },
  {
    mimetype: "application/vnd.3gpp.5gnas",
    source: "iana",
  },
  {
    mimetype: "application/vnd.3gpp.5gsa2x",
    source: "iana",
  },
  {
    mimetype: "application/vnd.3gpp.5gsa2x-local-service-information",
    source: "iana",
  },
  {
    mimetype: "application/vnd.3gpp.access-transfer-events+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp.bsf+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp.crs+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp.current-location-discovery+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp.gmop+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp.gtpc",
    source: "iana",
  },
  {
    mimetype: "application/vnd.3gpp.interworking-data",
    source: "iana",
  },
  {
    mimetype: "application/vnd.3gpp.lpp",
    source: "iana",
  },
  {
    mimetype: "application/vnd.3gpp.mc-signalling-ear",
    source: "iana",
  },
  {
    mimetype: "application/vnd.3gpp.mcdata-affiliation-command+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp.mcdata-info+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp.mcdata-msgstore-ctrl-request+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp.mcdata-payload",
    source: "iana",
  },
  {
    mimetype: "application/vnd.3gpp.mcdata-regroup+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp.mcdata-service-config+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp.mcdata-signalling",
    source: "iana",
  },
  {
    mimetype: "application/vnd.3gpp.mcdata-ue-config+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp.mcdata-user-profile+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp.mcptt-affiliation-command+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp.mcptt-floor-request+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp.mcptt-info+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp.mcptt-location-info+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp.mcptt-mbms-usage-info+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp.mcptt-regroup+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp.mcptt-service-config+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp.mcptt-signed+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp.mcptt-ue-config+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp.mcptt-ue-init-config+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp.mcptt-user-profile+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp.mcvideo-affiliation-command+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp.mcvideo-info+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp.mcvideo-location-info+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp.mcvideo-mbms-usage-info+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp.mcvideo-regroup+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp.mcvideo-service-config+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp.mcvideo-transmission-request+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp.mcvideo-ue-config+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp.mcvideo-user-profile+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp.mid-call+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp.ngap",
    source: "iana",
  },
  {
    mimetype: "application/vnd.3gpp.pfcp",
    source: "iana",
  },
  {
    mimetype: "application/vnd.3gpp.pic-bw-large",
    source: "iana",
    extensions: ["plb"],
  },
  {
    mimetype: "application/vnd.3gpp.pic-bw-small",
    source: "iana",
    extensions: ["psb"],
  },
  {
    mimetype: "application/vnd.3gpp.pic-bw-var",
    source: "iana",
    extensions: ["pvb"],
  },
  {
    mimetype: "application/vnd.3gpp.pinapp-info+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp.s1ap",
    source: "iana",
  },
  {
    mimetype: "application/vnd.3gpp.seal-group-doc+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp.seal-info+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp.seal-location-info+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp.seal-mbms-usage-info+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp.seal-network-qos-management-info+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp.seal-ue-config-info+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp.seal-unicast-info+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp.seal-user-profile-info+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp.sms",
    source: "iana",
  },
  {
    mimetype: "application/vnd.3gpp.sms+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp.srvcc-ext+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp.srvcc-info+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp.state-and-event-info+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp.ussd+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp.v2x",
    source: "iana",
  },
  {
    mimetype: "application/vnd.3gpp.vae-info+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp2.bcmcsinfo+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.3gpp2.sms",
    source: "iana",
  },
  {
    mimetype: "application/vnd.3gpp2.tcap",
    source: "iana",
    extensions: ["tcap"],
  },
  {
    mimetype: "application/vnd.3lightssoftware.imagescal",
    source: "iana",
  },
  {
    mimetype: "application/vnd.3m.post-it-notes",
    source: "iana",
    extensions: ["pwn"],
  },
  {
    mimetype: "application/vnd.accpac.simply.aso",
    source: "iana",
    extensions: ["aso"],
  },
  {
    mimetype: "application/vnd.accpac.simply.imp",
    source: "iana",
    extensions: ["imp"],
  },
  {
    mimetype: "application/vnd.acm.addressxfer+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.acm.chatbot+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.acucobol",
    source: "iana",
    extensions: ["acu"],
  },
  {
    mimetype: "application/vnd.acucorp",
    source: "iana",
    extensions: ["atc", "acutc"],
  },
  {
    mimetype: "application/vnd.adobe.air-application-installer-package+zip",
    source: "apache",
    compressible: false,
    extensions: ["air"],
  },
  {
    mimetype: "application/vnd.adobe.flash.movie",
    source: "iana",
  },
  {
    mimetype: "application/vnd.adobe.formscentral.fcdt",
    source: "iana",
    extensions: ["fcdt"],
  },
  {
    mimetype: "application/vnd.adobe.fxp",
    source: "iana",
    extensions: ["fxp", "fxpl"],
  },
  {
    mimetype: "application/vnd.adobe.partial-upload",
    source: "iana",
  },
  {
    mimetype: "application/vnd.adobe.xdp+xml",
    source: "iana",
    compressible: true,
    extensions: ["xdp"],
  },
  {
    mimetype: "application/vnd.adobe.xfdf",
    source: "apache",
    extensions: ["xfdf"],
  },
  {
    mimetype: "application/vnd.aether.imp",
    source: "iana",
  },
  {
    mimetype: "application/vnd.afpc.afplinedata",
    source: "iana",
  },
  {
    mimetype: "application/vnd.afpc.afplinedata-pagedef",
    source: "iana",
  },
  {
    mimetype: "application/vnd.afpc.cmoca-cmresource",
    source: "iana",
  },
  {
    mimetype: "application/vnd.afpc.foca-charset",
    source: "iana",
  },
  {
    mimetype: "application/vnd.afpc.foca-codedfont",
    source: "iana",
  },
  {
    mimetype: "application/vnd.afpc.foca-codepage",
    source: "iana",
  },
  {
    mimetype: "application/vnd.afpc.modca",
    source: "iana",
  },
  {
    mimetype: "application/vnd.afpc.modca-cmtable",
    source: "iana",
  },
  {
    mimetype: "application/vnd.afpc.modca-formdef",
    source: "iana",
  },
  {
    mimetype: "application/vnd.afpc.modca-mediummap",
    source: "iana",
  },
  {
    mimetype: "application/vnd.afpc.modca-objectcontainer",
    source: "iana",
  },
  {
    mimetype: "application/vnd.afpc.modca-overlay",
    source: "iana",
  },
  {
    mimetype: "application/vnd.afpc.modca-pagesegment",
    source: "iana",
  },
  {
    mimetype: "application/vnd.age",
    source: "iana",
    extensions: ["age"],
  },
  {
    mimetype: "application/vnd.ah-barcode",
    source: "apache",
  },
  {
    mimetype: "application/vnd.ahead.space",
    source: "iana",
    extensions: ["ahead"],
  },
  {
    mimetype: "application/vnd.airzip.filesecure.azf",
    source: "iana",
    extensions: ["azf"],
  },
  {
    mimetype: "application/vnd.airzip.filesecure.azs",
    source: "iana",
    extensions: ["azs"],
  },
  {
    mimetype: "application/vnd.amadeus+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.amazon.ebook",
    source: "apache",
    extensions: ["azw"],
  },
  {
    mimetype: "application/vnd.amazon.mobi8-ebook",
    source: "iana",
  },
  {
    mimetype: "application/vnd.americandynamics.acc",
    source: "iana",
    extensions: ["acc"],
  },
  {
    mimetype: "application/vnd.amiga.ami",
    source: "iana",
    extensions: ["ami"],
  },
  {
    mimetype: "application/vnd.amundsen.maze+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.android.ota",
    source: "iana",
  },
  {
    mimetype: "application/vnd.android.package-archive",
    source: "apache",
    compressible: false,
    extensions: ["apk"],
  },
  {
    mimetype: "application/vnd.anki",
    source: "iana",
  },
  {
    mimetype: "application/vnd.anser-web-certificate-issue-initiation",
    source: "iana",
    extensions: ["cii"],
  },
  {
    mimetype: "application/vnd.anser-web-funds-transfer-initiation",
    source: "apache",
    extensions: ["fti"],
  },
  {
    mimetype: "application/vnd.antix.game-component",
    source: "iana",
    extensions: ["atx"],
  },
  {
    mimetype: "application/vnd.apache.arrow.file",
    source: "iana",
  },
  {
    mimetype: "application/vnd.apache.arrow.stream",
    source: "iana",
  },
  {
    mimetype: "application/vnd.apache.parquet",
    source: "iana",
  },
  {
    mimetype: "application/vnd.apache.thrift.binary",
    source: "iana",
  },
  {
    mimetype: "application/vnd.apache.thrift.compact",
    source: "iana",
  },
  {
    mimetype: "application/vnd.apache.thrift.json",
    source: "iana",
  },
  {
    mimetype: "application/vnd.apexlang",
    source: "iana",
  },
  {
    mimetype: "application/vnd.api+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.aplextor.warrp+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.apothekende.reservation+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.apple.installer+xml",
    source: "iana",
    compressible: true,
    extensions: ["mpkg"],
  },
  {
    mimetype: "application/vnd.apple.keynote",
    source: "iana",
    extensions: ["key"],
  },
  {
    mimetype: "application/vnd.apple.mpegurl",
    source: "iana",
    extensions: ["m3u8"],
  },
  {
    mimetype: "application/vnd.apple.numbers",
    source: "iana",
    extensions: ["numbers"],
  },
  {
    mimetype: "application/vnd.apple.pages",
    source: "iana",
    extensions: ["pages"],
  },
  {
    mimetype: "application/vnd.apple.pkpass",
    compressible: false,
    extensions: ["pkpass"],
  },
  {
    mimetype: "application/vnd.arastra.swi",
    source: "apache",
  },
  {
    mimetype: "application/vnd.aristanetworks.swi",
    source: "iana",
    extensions: ["swi"],
  },
  {
    mimetype: "application/vnd.artisan+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.artsquare",
    source: "iana",
  },
  {
    mimetype: "application/vnd.astraea-software.iota",
    source: "iana",
    extensions: ["iota"],
  },
  {
    mimetype: "application/vnd.audiograph",
    source: "iana",
    extensions: ["aep"],
  },
  {
    mimetype: "application/vnd.autopackage",
    source: "iana",
  },
  {
    mimetype: "application/vnd.avalon+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.avistar+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.balsamiq.bmml+xml",
    source: "iana",
    compressible: true,
    extensions: ["bmml"],
  },
  {
    mimetype: "application/vnd.balsamiq.bmpr",
    source: "iana",
  },
  {
    mimetype: "application/vnd.banana-accounting",
    source: "iana",
  },
  {
    mimetype: "application/vnd.bbf.usp.error",
    source: "iana",
  },
  {
    mimetype: "application/vnd.bbf.usp.msg",
    source: "iana",
  },
  {
    mimetype: "application/vnd.bbf.usp.msg+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.bekitzur-stech+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.belightsoft.lhzd+zip",
    source: "iana",
    compressible: false,
  },
  {
    mimetype: "application/vnd.belightsoft.lhzl+zip",
    source: "iana",
    compressible: false,
  },
  {
    mimetype: "application/vnd.bint.med-content",
    source: "iana",
  },
  {
    mimetype: "application/vnd.biopax.rdf+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.blink-idb-value-wrapper",
    source: "iana",
  },
  {
    mimetype: "application/vnd.blueice.multipass",
    source: "iana",
    extensions: ["mpm"],
  },
  {
    mimetype: "application/vnd.bluetooth.ep.oob",
    source: "iana",
  },
  {
    mimetype: "application/vnd.bluetooth.le.oob",
    source: "iana",
  },
  {
    mimetype: "application/vnd.bmi",
    source: "iana",
    extensions: ["bmi"],
  },
  {
    mimetype: "application/vnd.bpf",
    source: "iana",
  },
  {
    mimetype: "application/vnd.bpf3",
    source: "iana",
  },
  {
    mimetype: "application/vnd.businessobjects",
    source: "iana",
    extensions: ["rep"],
  },
  {
    mimetype: "application/vnd.byu.uapi+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.bzip3",
    source: "iana",
  },
  {
    mimetype: "application/vnd.c3voc.schedule+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.cab-jscript",
    source: "iana",
  },
  {
    mimetype: "application/vnd.canon-cpdl",
    source: "iana",
  },
  {
    mimetype: "application/vnd.canon-lips",
    source: "iana",
  },
  {
    mimetype: "application/vnd.capasystems-pg+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.cendio.thinlinc.clientconf",
    source: "iana",
  },
  {
    mimetype: "application/vnd.century-systems.tcp_stream",
    source: "iana",
  },
  {
    mimetype: "application/vnd.chemdraw+xml",
    source: "iana",
    compressible: true,
    extensions: ["cdxml"],
  },
  {
    mimetype: "application/vnd.chess-pgn",
    source: "iana",
  },
  {
    mimetype: "application/vnd.chipnuts.karaoke-mmd",
    source: "iana",
    extensions: ["mmd"],
  },
  {
    mimetype: "application/vnd.ciedi",
    source: "iana",
  },
  {
    mimetype: "application/vnd.cinderella",
    source: "iana",
    extensions: ["cdy"],
  },
  {
    mimetype: "application/vnd.cirpack.isdn-ext",
    source: "iana",
  },
  {
    mimetype: "application/vnd.citationstyles.style+xml",
    source: "iana",
    compressible: true,
    extensions: ["csl"],
  },
  {
    mimetype: "application/vnd.claymore",
    source: "iana",
    extensions: ["cla"],
  },
  {
    mimetype: "application/vnd.cloanto.rp9",
    source: "iana",
    extensions: ["rp9"],
  },
  {
    mimetype: "application/vnd.clonk.c4group",
    source: "iana",
    extensions: ["c4g", "c4d", "c4f", "c4p", "c4u"],
  },
  {
    mimetype: "application/vnd.cluetrust.cartomobile-config",
    source: "iana",
    extensions: ["c11amc"],
  },
  {
    mimetype: "application/vnd.cluetrust.cartomobile-config-pkg",
    source: "iana",
    extensions: ["c11amz"],
  },
  {
    mimetype: "application/vnd.cncf.helm.chart.content.v1.tar+gzip",
    source: "iana",
  },
  {
    mimetype: "application/vnd.cncf.helm.chart.provenance.v1.prov",
    source: "iana",
  },
  {
    mimetype: "application/vnd.cncf.helm.config.v1+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.coffeescript",
    source: "iana",
  },
  {
    mimetype: "application/vnd.collabio.xodocuments.document",
    source: "iana",
  },
  {
    mimetype: "application/vnd.collabio.xodocuments.document-template",
    source: "iana",
  },
  {
    mimetype: "application/vnd.collabio.xodocuments.presentation",
    source: "iana",
  },
  {
    mimetype: "application/vnd.collabio.xodocuments.presentation-template",
    source: "iana",
  },
  {
    mimetype: "application/vnd.collabio.xodocuments.spreadsheet",
    source: "iana",
  },
  {
    mimetype: "application/vnd.collabio.xodocuments.spreadsheet-template",
    source: "iana",
  },
  {
    mimetype: "application/vnd.collection+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.collection.doc+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.collection.next+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.comicbook+zip",
    source: "iana",
    compressible: false,
  },
  {
    mimetype: "application/vnd.comicbook-rar",
    source: "iana",
  },
  {
    mimetype: "application/vnd.commerce-battelle",
    source: "iana",
  },
  {
    mimetype: "application/vnd.commonspace",
    source: "iana",
    extensions: ["csp"],
  },
  {
    mimetype: "application/vnd.contact.cmsg",
    source: "iana",
    extensions: ["cdbcmsg"],
  },
  {
    mimetype: "application/vnd.coreos.ignition+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.cosmocaller",
    source: "iana",
    extensions: ["cmc"],
  },
  {
    mimetype: "application/vnd.crick.clicker",
    source: "iana",
    extensions: ["clkx"],
  },
  {
    mimetype: "application/vnd.crick.clicker.keyboard",
    source: "iana",
    extensions: ["clkk"],
  },
  {
    mimetype: "application/vnd.crick.clicker.palette",
    source: "iana",
    extensions: ["clkp"],
  },
  {
    mimetype: "application/vnd.crick.clicker.template",
    source: "iana",
    extensions: ["clkt"],
  },
  {
    mimetype: "application/vnd.crick.clicker.wordbank",
    source: "iana",
    extensions: ["clkw"],
  },
  {
    mimetype: "application/vnd.criticaltools.wbs+xml",
    source: "iana",
    compressible: true,
    extensions: ["wbs"],
  },
  {
    mimetype: "application/vnd.cryptii.pipe+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.crypto-shade-file",
    source: "iana",
  },
  {
    mimetype: "application/vnd.cryptomator.encrypted",
    source: "iana",
  },
  {
    mimetype: "application/vnd.cryptomator.vault",
    source: "iana",
  },
  {
    mimetype: "application/vnd.ctc-posml",
    source: "iana",
    extensions: ["pml"],
  },
  {
    mimetype: "application/vnd.ctct.ws+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.cups-pdf",
    source: "iana",
  },
  {
    mimetype: "application/vnd.cups-postscript",
    source: "iana",
  },
  {
    mimetype: "application/vnd.cups-ppd",
    source: "iana",
    extensions: ["ppd"],
  },
  {
    mimetype: "application/vnd.cups-raster",
    source: "iana",
  },
  {
    mimetype: "application/vnd.cups-raw",
    source: "iana",
  },
  {
    mimetype: "application/vnd.curl",
    source: "iana",
  },
  {
    mimetype: "application/vnd.curl.car",
    source: "apache",
    extensions: ["car"],
  },
  {
    mimetype: "application/vnd.curl.pcurl",
    source: "apache",
    extensions: ["pcurl"],
  },
  {
    mimetype: "application/vnd.cyan.dean.root+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.cybank",
    source: "iana",
  },
  {
    mimetype: "application/vnd.cyclonedx+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.cyclonedx+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.d2l.coursepackage1p0+zip",
    source: "iana",
    compressible: false,
  },
  {
    mimetype: "application/vnd.d3m-dataset",
    source: "iana",
  },
  {
    mimetype: "application/vnd.d3m-problem",
    source: "iana",
  },
  {
    mimetype: "application/vnd.dart",
    source: "iana",
    compressible: true,
    extensions: ["dart"],
  },
  {
    mimetype: "application/vnd.data-vision.rdz",
    source: "iana",
    extensions: ["rdz"],
  },
  {
    mimetype: "application/vnd.datalog",
    source: "iana",
  },
  {
    mimetype: "application/vnd.datapackage+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.dataresource+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.dbf",
    source: "iana",
    extensions: ["dbf"],
  },
  {
    mimetype: "application/vnd.debian.binary-package",
    source: "iana",
  },
  {
    mimetype: "application/vnd.dece.data",
    source: "iana",
    extensions: ["uvf", "uvvf", "uvd", "uvvd"],
  },
  {
    mimetype: "application/vnd.dece.ttml+xml",
    source: "iana",
    compressible: true,
    extensions: ["uvt", "uvvt"],
  },
  {
    mimetype: "application/vnd.dece.unspecified",
    source: "iana",
    extensions: ["uvx", "uvvx"],
  },
  {
    mimetype: "application/vnd.dece.zip",
    source: "iana",
    extensions: ["uvz", "uvvz"],
  },
  {
    mimetype: "application/vnd.denovo.fcselayout-link",
    source: "iana",
    extensions: ["fe_launch"],
  },
  {
    mimetype: "application/vnd.desmume.movie",
    source: "iana",
  },
  {
    mimetype: "application/vnd.dir-bi.plate-dl-nosuffix",
    source: "iana",
  },
  {
    mimetype: "application/vnd.dm.delegation+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.dna",
    source: "iana",
    extensions: ["dna"],
  },
  {
    mimetype: "application/vnd.document+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.dolby.mlp",
    source: "apache",
    extensions: ["mlp"],
  },
  {
    mimetype: "application/vnd.dolby.mobile.1",
    source: "iana",
  },
  {
    mimetype: "application/vnd.dolby.mobile.2",
    source: "iana",
  },
  {
    mimetype: "application/vnd.doremir.scorecloud-binary-document",
    source: "iana",
  },
  {
    mimetype: "application/vnd.dpgraph",
    source: "iana",
    extensions: ["dpg"],
  },
  {
    mimetype: "application/vnd.dreamfactory",
    source: "iana",
    extensions: ["dfac"],
  },
  {
    mimetype: "application/vnd.drive+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.ds-keypoint",
    source: "apache",
    extensions: ["kpxx"],
  },
  {
    mimetype: "application/vnd.dtg.local",
    source: "iana",
  },
  {
    mimetype: "application/vnd.dtg.local.flash",
    source: "iana",
  },
  {
    mimetype: "application/vnd.dtg.local.html",
    source: "iana",
  },
  {
    mimetype: "application/vnd.dvb.ait",
    source: "iana",
    extensions: ["ait"],
  },
  {
    mimetype: "application/vnd.dvb.dvbisl+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.dvb.dvbj",
    source: "iana",
  },
  {
    mimetype: "application/vnd.dvb.esgcontainer",
    source: "iana",
  },
  {
    mimetype: "application/vnd.dvb.ipdcdftnotifaccess",
    source: "iana",
  },
  {
    mimetype: "application/vnd.dvb.ipdcesgaccess",
    source: "iana",
  },
  {
    mimetype: "application/vnd.dvb.ipdcesgaccess2",
    source: "iana",
  },
  {
    mimetype: "application/vnd.dvb.ipdcesgpdd",
    source: "iana",
  },
  {
    mimetype: "application/vnd.dvb.ipdcroaming",
    source: "iana",
  },
  {
    mimetype: "application/vnd.dvb.iptv.alfec-base",
    source: "iana",
  },
  {
    mimetype: "application/vnd.dvb.iptv.alfec-enhancement",
    source: "iana",
  },
  {
    mimetype: "application/vnd.dvb.notif-aggregate-root+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.dvb.notif-container+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.dvb.notif-generic+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.dvb.notif-ia-msglist+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.dvb.notif-ia-registration-request+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.dvb.notif-ia-registration-response+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.dvb.notif-init+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.dvb.pfr",
    source: "iana",
  },
  {
    mimetype: "application/vnd.dvb.service",
    source: "iana",
    extensions: ["svc"],
  },
  {
    mimetype: "application/vnd.dxr",
    source: "iana",
  },
  {
    mimetype: "application/vnd.dynageo",
    source: "iana",
    extensions: ["geo"],
  },
  {
    mimetype: "application/vnd.dzr",
    source: "iana",
  },
  {
    mimetype: "application/vnd.easykaraoke.cdgdownload",
    source: "iana",
  },
  {
    mimetype: "application/vnd.ecdis-update",
    source: "iana",
  },
  {
    mimetype: "application/vnd.ecip.rlp",
    source: "iana",
  },
  {
    mimetype: "application/vnd.eclipse.ditto+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.ecowin.chart",
    source: "iana",
    extensions: ["mag"],
  },
  {
    mimetype: "application/vnd.ecowin.filerequest",
    source: "iana",
  },
  {
    mimetype: "application/vnd.ecowin.fileupdate",
    source: "iana",
  },
  {
    mimetype: "application/vnd.ecowin.series",
    source: "iana",
  },
  {
    mimetype: "application/vnd.ecowin.seriesrequest",
    source: "iana",
  },
  {
    mimetype: "application/vnd.ecowin.seriesupdate",
    source: "iana",
  },
  {
    mimetype: "application/vnd.efi.img",
    source: "iana",
  },
  {
    mimetype: "application/vnd.efi.iso",
    source: "iana",
  },
  {
    mimetype: "application/vnd.eln+zip",
    source: "iana",
    compressible: false,
  },
  {
    mimetype: "application/vnd.emclient.accessrequest+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.enliven",
    source: "iana",
    extensions: ["nml"],
  },
  {
    mimetype: "application/vnd.enphase.envoy",
    source: "iana",
  },
  {
    mimetype: "application/vnd.eprints.data+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.epson.esf",
    source: "iana",
    extensions: ["esf"],
  },
  {
    mimetype: "application/vnd.epson.msf",
    source: "iana",
    extensions: ["msf"],
  },
  {
    mimetype: "application/vnd.epson.quickanime",
    source: "iana",
    extensions: ["qam"],
  },
  {
    mimetype: "application/vnd.epson.salt",
    source: "iana",
    extensions: ["slt"],
  },
  {
    mimetype: "application/vnd.epson.ssf",
    source: "iana",
    extensions: ["ssf"],
  },
  {
    mimetype: "application/vnd.ericsson.quickcall",
    source: "iana",
  },
  {
    mimetype: "application/vnd.erofs",
    source: "iana",
  },
  {
    mimetype: "application/vnd.espass-espass+zip",
    source: "iana",
    compressible: false,
  },
  {
    mimetype: "application/vnd.eszigno3+xml",
    source: "iana",
    compressible: true,
    extensions: ["es3", "et3"],
  },
  {
    mimetype: "application/vnd.etsi.aoc+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.etsi.asic-e+zip",
    source: "iana",
    compressible: false,
  },
  {
    mimetype: "application/vnd.etsi.asic-s+zip",
    source: "iana",
    compressible: false,
  },
  {
    mimetype: "application/vnd.etsi.cug+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.etsi.iptvcommand+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.etsi.iptvdiscovery+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.etsi.iptvprofile+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.etsi.iptvsad-bc+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.etsi.iptvsad-cod+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.etsi.iptvsad-npvr+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.etsi.iptvservice+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.etsi.iptvsync+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.etsi.iptvueprofile+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.etsi.mcid+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.etsi.mheg5",
    source: "iana",
  },
  {
    mimetype: "application/vnd.etsi.overload-control-policy-dataset+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.etsi.pstn+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.etsi.sci+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.etsi.simservs+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.etsi.timestamp-token",
    source: "iana",
  },
  {
    mimetype: "application/vnd.etsi.tsl+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.etsi.tsl.der",
    source: "iana",
  },
  {
    mimetype: "application/vnd.eu.kasparian.car+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.eudora.data",
    source: "iana",
  },
  {
    mimetype: "application/vnd.evolv.ecig.profile",
    source: "iana",
  },
  {
    mimetype: "application/vnd.evolv.ecig.settings",
    source: "iana",
  },
  {
    mimetype: "application/vnd.evolv.ecig.theme",
    source: "iana",
  },
  {
    mimetype: "application/vnd.exstream-empower+zip",
    source: "iana",
    compressible: false,
  },
  {
    mimetype: "application/vnd.exstream-package",
    source: "iana",
  },
  {
    mimetype: "application/vnd.ezpix-album",
    source: "iana",
    extensions: ["ez2"],
  },
  {
    mimetype: "application/vnd.ezpix-package",
    source: "iana",
    extensions: ["ez3"],
  },
  {
    mimetype: "application/vnd.f-secure.mobile",
    source: "iana",
  },
  {
    mimetype: "application/vnd.familysearch.gedcom+zip",
    source: "iana",
    compressible: false,
  },
  {
    mimetype: "application/vnd.fastcopy-disk-image",
    source: "iana",
  },
  {
    mimetype: "application/vnd.fdf",
    source: "apache",
    extensions: ["fdf"],
  },
  {
    mimetype: "application/vnd.fdsn.mseed",
    source: "iana",
    extensions: ["mseed"],
  },
  {
    mimetype: "application/vnd.fdsn.seed",
    source: "iana",
    extensions: ["seed", "dataless"],
  },
  {
    mimetype: "application/vnd.ffsns",
    source: "iana",
  },
  {
    mimetype: "application/vnd.ficlab.flb+zip",
    source: "iana",
    compressible: false,
  },
  {
    mimetype: "application/vnd.filmit.zfc",
    source: "iana",
  },
  {
    mimetype: "application/vnd.fints",
    source: "iana",
  },
  {
    mimetype: "application/vnd.firemonkeys.cloudcell",
    source: "iana",
  },
  {
    mimetype: "application/vnd.flographit",
    source: "iana",
    extensions: ["gph"],
  },
  {
    mimetype: "application/vnd.fluxtime.clip",
    source: "iana",
    extensions: ["ftc"],
  },
  {
    mimetype: "application/vnd.font-fontforge-sfd",
    source: "iana",
  },
  {
    mimetype: "application/vnd.framemaker",
    source: "iana",
    extensions: ["fm", "frame", "maker", "book"],
  },
  {
    mimetype: "application/vnd.freelog.comic",
    source: "iana",
  },
  {
    mimetype: "application/vnd.frogans.fnc",
    source: "apache",
    extensions: ["fnc"],
  },
  {
    mimetype: "application/vnd.frogans.ltf",
    source: "apache",
    extensions: ["ltf"],
  },
  {
    mimetype: "application/vnd.fsc.weblaunch",
    source: "iana",
    extensions: ["fsc"],
  },
  {
    mimetype: "application/vnd.fujifilm.fb.docuworks",
    source: "iana",
  },
  {
    mimetype: "application/vnd.fujifilm.fb.docuworks.binder",
    source: "iana",
  },
  {
    mimetype: "application/vnd.fujifilm.fb.docuworks.container",
    source: "iana",
  },
  {
    mimetype: "application/vnd.fujifilm.fb.jfi+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.fujitsu.oasys",
    source: "iana",
    extensions: ["oas"],
  },
  {
    mimetype: "application/vnd.fujitsu.oasys2",
    source: "iana",
    extensions: ["oa2"],
  },
  {
    mimetype: "application/vnd.fujitsu.oasys3",
    source: "iana",
    extensions: ["oa3"],
  },
  {
    mimetype: "application/vnd.fujitsu.oasysgp",
    source: "iana",
    extensions: ["fg5"],
  },
  {
    mimetype: "application/vnd.fujitsu.oasysprs",
    source: "iana",
    extensions: ["bh2"],
  },
  {
    mimetype: "application/vnd.fujixerox.art-ex",
    source: "iana",
  },
  {
    mimetype: "application/vnd.fujixerox.art4",
    source: "iana",
  },
  {
    mimetype: "application/vnd.fujixerox.ddd",
    source: "iana",
    extensions: ["ddd"],
  },
  {
    mimetype: "application/vnd.fujixerox.docuworks",
    source: "iana",
    extensions: ["xdw"],
  },
  {
    mimetype: "application/vnd.fujixerox.docuworks.binder",
    source: "iana",
    extensions: ["xbd"],
  },
  {
    mimetype: "application/vnd.fujixerox.docuworks.container",
    source: "iana",
  },
  {
    mimetype: "application/vnd.fujixerox.hbpl",
    source: "iana",
  },
  {
    mimetype: "application/vnd.fut-misnet",
    source: "iana",
  },
  {
    mimetype: "application/vnd.futoin+cbor",
    source: "iana",
  },
  {
    mimetype: "application/vnd.futoin+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.fuzzysheet",
    source: "iana",
    extensions: ["fzs"],
  },
  {
    mimetype: "application/vnd.ga4gh.passport+jwt",
    source: "iana",
  },
  {
    mimetype: "application/vnd.genomatix.tuxedo",
    source: "iana",
    extensions: ["txd"],
  },
  {
    mimetype: "application/vnd.genozip",
    source: "iana",
  },
  {
    mimetype: "application/vnd.gentics.grd+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.gentoo.catmetadata+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.gentoo.ebuild",
    source: "iana",
  },
  {
    mimetype: "application/vnd.gentoo.eclass",
    source: "iana",
  },
  {
    mimetype: "application/vnd.gentoo.gpkg",
    source: "iana",
  },
  {
    mimetype: "application/vnd.gentoo.manifest",
    source: "iana",
  },
  {
    mimetype: "application/vnd.gentoo.pkgmetadata+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.gentoo.xpak",
    source: "iana",
  },
  {
    mimetype: "application/vnd.geo+json",
    source: "apache",
    compressible: true,
  },
  {
    mimetype: "application/vnd.geocube+xml",
    source: "apache",
    compressible: true,
  },
  {
    mimetype: "application/vnd.geogebra.file",
    source: "iana",
    extensions: ["ggb"],
  },
  {
    mimetype: "application/vnd.geogebra.slides",
    source: "iana",
    extensions: ["ggs"],
  },
  {
    mimetype: "application/vnd.geogebra.tool",
    source: "iana",
    extensions: ["ggt"],
  },
  {
    mimetype: "application/vnd.geometry-explorer",
    source: "iana",
    extensions: ["gex", "gre"],
  },
  {
    mimetype: "application/vnd.geonext",
    source: "iana",
    extensions: ["gxt"],
  },
  {
    mimetype: "application/vnd.geoplan",
    source: "iana",
    extensions: ["g2w"],
  },
  {
    mimetype: "application/vnd.geospace",
    source: "iana",
    extensions: ["g3w"],
  },
  {
    mimetype: "application/vnd.gerber",
    source: "iana",
  },
  {
    mimetype: "application/vnd.globalplatform.card-content-mgt",
    source: "iana",
  },
  {
    mimetype: "application/vnd.globalplatform.card-content-mgt-response",
    source: "iana",
  },
  {
    mimetype: "application/vnd.gmx",
    source: "iana",
    extensions: ["gmx"],
  },
  {
    mimetype: "application/vnd.gnu.taler.exchange+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.gnu.taler.merchant+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.google-apps.document",
    compressible: false,
    extensions: ["gdoc"],
  },
  {
    mimetype: "application/vnd.google-apps.presentation",
    compressible: false,
    extensions: ["gslides"],
  },
  {
    mimetype: "application/vnd.google-apps.spreadsheet",
    compressible: false,
    extensions: ["gsheet"],
  },
  {
    mimetype: "application/vnd.google-earth.kml+xml",
    source: "iana",
    compressible: true,
    extensions: ["kml"],
  },
  {
    mimetype: "application/vnd.google-earth.kmz",
    source: "iana",
    compressible: false,
    extensions: ["kmz"],
  },
  {
    mimetype: "application/vnd.gov.sk.e-form+xml",
    source: "apache",
    compressible: true,
  },
  {
    mimetype: "application/vnd.gov.sk.e-form+zip",
    source: "iana",
    compressible: false,
  },
  {
    mimetype: "application/vnd.gov.sk.xmldatacontainer+xml",
    source: "iana",
    compressible: true,
    extensions: ["xdcf"],
  },
  {
    mimetype: "application/vnd.gpxsee.map+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.grafeq",
    source: "iana",
    extensions: ["gqf", "gqs"],
  },
  {
    mimetype: "application/vnd.gridmp",
    source: "iana",
  },
  {
    mimetype: "application/vnd.groove-account",
    source: "iana",
    extensions: ["gac"],
  },
  {
    mimetype: "application/vnd.groove-help",
    source: "iana",
    extensions: ["ghf"],
  },
  {
    mimetype: "application/vnd.groove-identity-message",
    source: "iana",
    extensions: ["gim"],
  },
  {
    mimetype: "application/vnd.groove-injector",
    source: "iana",
    extensions: ["grv"],
  },
  {
    mimetype: "application/vnd.groove-tool-message",
    source: "iana",
    extensions: ["gtm"],
  },
  {
    mimetype: "application/vnd.groove-tool-template",
    source: "iana",
    extensions: ["tpl"],
  },
  {
    mimetype: "application/vnd.groove-vcard",
    source: "iana",
    extensions: ["vcg"],
  },
  {
    mimetype: "application/vnd.hal+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.hal+xml",
    source: "iana",
    compressible: true,
    extensions: ["hal"],
  },
  {
    mimetype: "application/vnd.handheld-entertainment+xml",
    source: "iana",
    compressible: true,
    extensions: ["zmm"],
  },
  {
    mimetype: "application/vnd.hbci",
    source: "iana",
    extensions: ["hbci"],
  },
  {
    mimetype: "application/vnd.hc+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.hcl-bireports",
    source: "iana",
  },
  {
    mimetype: "application/vnd.hdt",
    source: "iana",
  },
  {
    mimetype: "application/vnd.heroku+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.hhe.lesson-player",
    source: "iana",
    extensions: ["les"],
  },
  {
    mimetype: "application/vnd.hp-hpgl",
    source: "iana",
    extensions: ["hpgl"],
  },
  {
    mimetype: "application/vnd.hp-hpid",
    source: "iana",
    extensions: ["hpid"],
  },
  {
    mimetype: "application/vnd.hp-hps",
    source: "iana",
    extensions: ["hps"],
  },
  {
    mimetype: "application/vnd.hp-jlyt",
    source: "iana",
    extensions: ["jlt"],
  },
  {
    mimetype: "application/vnd.hp-pcl",
    source: "iana",
    extensions: ["pcl"],
  },
  {
    mimetype: "application/vnd.hp-pclxl",
    source: "iana",
    extensions: ["pclxl"],
  },
  {
    mimetype: "application/vnd.hsl",
    source: "iana",
  },
  {
    mimetype: "application/vnd.httphone",
    source: "iana",
  },
  {
    mimetype: "application/vnd.hydrostatix.sof-data",
    source: "iana",
    extensions: ["sfd-hdstx"],
  },
  {
    mimetype: "application/vnd.hyper+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.hyper-item+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.hyperdrive+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.hzn-3d-crossword",
    source: "iana",
  },
  {
    mimetype: "application/vnd.ibm.afplinedata",
    source: "apache",
  },
  {
    mimetype: "application/vnd.ibm.electronic-media",
    source: "iana",
  },
  {
    mimetype: "application/vnd.ibm.minipay",
    source: "iana",
    extensions: ["mpy"],
  },
  {
    mimetype: "application/vnd.ibm.modcap",
    source: "apache",
    extensions: ["afp", "listafp", "list3820"],
  },
  {
    mimetype: "application/vnd.ibm.rights-management",
    source: "iana",
    extensions: ["irm"],
  },
  {
    mimetype: "application/vnd.ibm.secure-container",
    source: "iana",
    extensions: ["sc"],
  },
  {
    mimetype: "application/vnd.iccprofile",
    source: "iana",
    extensions: ["icc", "icm"],
  },
  {
    mimetype: "application/vnd.ieee.1905",
    source: "iana",
  },
  {
    mimetype: "application/vnd.igloader",
    source: "iana",
    extensions: ["igl"],
  },
  {
    mimetype: "application/vnd.imagemeter.folder+zip",
    source: "iana",
    compressible: false,
  },
  {
    mimetype: "application/vnd.imagemeter.image+zip",
    source: "iana",
    compressible: false,
  },
  {
    mimetype: "application/vnd.immervision-ivp",
    source: "iana",
    extensions: ["ivp"],
  },
  {
    mimetype: "application/vnd.immervision-ivu",
    source: "iana",
    extensions: ["ivu"],
  },
  {
    mimetype: "application/vnd.ims.imsccv1p1",
    source: "iana",
  },
  {
    mimetype: "application/vnd.ims.imsccv1p2",
    source: "iana",
  },
  {
    mimetype: "application/vnd.ims.imsccv1p3",
    source: "iana",
  },
  {
    mimetype: "application/vnd.ims.lis.v2.result+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.ims.lti.v2.toolconsumerprofile+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.ims.lti.v2.toolproxy+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.ims.lti.v2.toolproxy.id+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.ims.lti.v2.toolsettings+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.ims.lti.v2.toolsettings.simple+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.informedcontrol.rms+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.informix-visionary",
    source: "apache",
  },
  {
    mimetype: "application/vnd.infotech.project",
    source: "iana",
  },
  {
    mimetype: "application/vnd.infotech.project+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.innopath.wamp.notification",
    source: "iana",
  },
  {
    mimetype: "application/vnd.insors.igm",
    source: "iana",
    extensions: ["igm"],
  },
  {
    mimetype: "application/vnd.intercon.formnet",
    source: "iana",
    extensions: ["xpw", "xpx"],
  },
  {
    mimetype: "application/vnd.intergeo",
    source: "iana",
    extensions: ["i2g"],
  },
  {
    mimetype: "application/vnd.intertrust.digibox",
    source: "iana",
  },
  {
    mimetype: "application/vnd.intertrust.nncp",
    source: "iana",
  },
  {
    mimetype: "application/vnd.intu.qbo",
    source: "iana",
    extensions: ["qbo"],
  },
  {
    mimetype: "application/vnd.intu.qfx",
    source: "iana",
    extensions: ["qfx"],
  },
  {
    mimetype: "application/vnd.ipfs.ipns-record",
    source: "iana",
  },
  {
    mimetype: "application/vnd.ipld.car",
    source: "iana",
  },
  {
    mimetype: "application/vnd.ipld.dag-cbor",
    source: "iana",
  },
  {
    mimetype: "application/vnd.ipld.dag-json",
    source: "iana",
  },
  {
    mimetype: "application/vnd.ipld.raw",
    source: "iana",
  },
  {
    mimetype: "application/vnd.iptc.g2.catalogitem+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.iptc.g2.conceptitem+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.iptc.g2.knowledgeitem+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.iptc.g2.newsitem+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.iptc.g2.newsmessage+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.iptc.g2.packageitem+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.iptc.g2.planningitem+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.ipunplugged.rcprofile",
    source: "iana",
    extensions: ["rcprofile"],
  },
  {
    mimetype: "application/vnd.irepository.package+xml",
    source: "iana",
    compressible: true,
    extensions: ["irp"],
  },
  {
    mimetype: "application/vnd.is-xpr",
    source: "iana",
    extensions: ["xpr"],
  },
  {
    mimetype: "application/vnd.isac.fcs",
    source: "iana",
    extensions: ["fcs"],
  },
  {
    mimetype: "application/vnd.iso11783-10+zip",
    source: "iana",
    compressible: false,
  },
  {
    mimetype: "application/vnd.jam",
    source: "iana",
    extensions: ["jam"],
  },
  {
    mimetype: "application/vnd.japannet-directory-service",
    source: "iana",
  },
  {
    mimetype: "application/vnd.japannet-jpnstore-wakeup",
    source: "iana",
  },
  {
    mimetype: "application/vnd.japannet-payment-wakeup",
    source: "iana",
  },
  {
    mimetype: "application/vnd.japannet-registration",
    source: "iana",
  },
  {
    mimetype: "application/vnd.japannet-registration-wakeup",
    source: "iana",
  },
  {
    mimetype: "application/vnd.japannet-setstore-wakeup",
    source: "iana",
  },
  {
    mimetype: "application/vnd.japannet-verification",
    source: "iana",
  },
  {
    mimetype: "application/vnd.japannet-verification-wakeup",
    source: "iana",
  },
  {
    mimetype: "application/vnd.jcp.javame.midlet-rms",
    source: "iana",
    extensions: ["rms"],
  },
  {
    mimetype: "application/vnd.jisp",
    source: "iana",
    extensions: ["jisp"],
  },
  {
    mimetype: "application/vnd.joost.joda-archive",
    source: "iana",
    extensions: ["joda"],
  },
  {
    mimetype: "application/vnd.jsk.isdn-ngn",
    source: "iana",
  },
  {
    mimetype: "application/vnd.kahootz",
    source: "iana",
    extensions: ["ktz", "ktr"],
  },
  {
    mimetype: "application/vnd.kde.karbon",
    source: "iana",
    extensions: ["karbon"],
  },
  {
    mimetype: "application/vnd.kde.kchart",
    source: "iana",
    extensions: ["chrt"],
  },
  {
    mimetype: "application/vnd.kde.kformula",
    source: "iana",
    extensions: ["kfo"],
  },
  {
    mimetype: "application/vnd.kde.kivio",
    source: "iana",
    extensions: ["flw"],
  },
  {
    mimetype: "application/vnd.kde.kontour",
    source: "iana",
    extensions: ["kon"],
  },
  {
    mimetype: "application/vnd.kde.kpresenter",
    source: "iana",
    extensions: ["kpr", "kpt"],
  },
  {
    mimetype: "application/vnd.kde.kspread",
    source: "iana",
    extensions: ["ksp"],
  },
  {
    mimetype: "application/vnd.kde.kword",
    source: "iana",
    extensions: ["kwd", "kwt"],
  },
  {
    mimetype: "application/vnd.kenameaapp",
    source: "iana",
    extensions: ["htke"],
  },
  {
    mimetype: "application/vnd.kidspiration",
    source: "iana",
    extensions: ["kia"],
  },
  {
    mimetype: "application/vnd.kinar",
    source: "iana",
    extensions: ["kne", "knp"],
  },
  {
    mimetype: "application/vnd.koan",
    source: "iana",
    extensions: ["skp", "skd", "skt", "skm"],
  },
  {
    mimetype: "application/vnd.kodak-descriptor",
    source: "iana",
    extensions: ["sse"],
  },
  {
    mimetype: "application/vnd.las",
    source: "iana",
  },
  {
    mimetype: "application/vnd.las.las+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.las.las+xml",
    source: "iana",
    compressible: true,
    extensions: ["lasxml"],
  },
  {
    mimetype: "application/vnd.laszip",
    source: "iana",
  },
  {
    mimetype: "application/vnd.ldev.productlicensing",
    source: "iana",
  },
  {
    mimetype: "application/vnd.leap+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.liberty-request+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.llamagraphics.life-balance.desktop",
    source: "iana",
    extensions: ["lbd"],
  },
  {
    mimetype: "application/vnd.llamagraphics.life-balance.exchange+xml",
    source: "iana",
    compressible: true,
    extensions: ["lbe"],
  },
  {
    mimetype: "application/vnd.logipipe.circuit+zip",
    source: "iana",
    compressible: false,
  },
  {
    mimetype: "application/vnd.loom",
    source: "iana",
  },
  {
    mimetype: "application/vnd.lotus-1-2-3",
    source: "iana",
    extensions: ["123"],
  },
  {
    mimetype: "application/vnd.lotus-approach",
    source: "iana",
    extensions: ["apr"],
  },
  {
    mimetype: "application/vnd.lotus-freelance",
    source: "iana",
    extensions: ["pre"],
  },
  {
    mimetype: "application/vnd.lotus-notes",
    source: "iana",
    extensions: ["nsf"],
  },
  {
    mimetype: "application/vnd.lotus-organizer",
    source: "iana",
    extensions: ["org"],
  },
  {
    mimetype: "application/vnd.lotus-screencam",
    source: "iana",
    extensions: ["scm"],
  },
  {
    mimetype: "application/vnd.lotus-wordpro",
    source: "iana",
    extensions: ["lwp"],
  },
  {
    mimetype: "application/vnd.macports.portpkg",
    source: "iana",
    extensions: ["portpkg"],
  },
  {
    mimetype: "application/vnd.mapbox-vector-tile",
    source: "iana",
    extensions: ["mvt"],
  },
  {
    mimetype: "application/vnd.marlin.drm.actiontoken+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.marlin.drm.conftoken+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.marlin.drm.license+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.marlin.drm.mdcf",
    source: "iana",
  },
  {
    mimetype: "application/vnd.mason+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.maxar.archive.3tz+zip",
    source: "iana",
    compressible: false,
  },
  {
    mimetype: "application/vnd.maxmind.maxmind-db",
    source: "iana",
  },
  {
    mimetype: "application/vnd.mcd",
    source: "iana",
    extensions: ["mcd"],
  },
  {
    mimetype: "application/vnd.mdl",
    source: "iana",
  },
  {
    mimetype: "application/vnd.mdl-mbsdf",
    source: "iana",
  },
  {
    mimetype: "application/vnd.medcalcdata",
    source: "iana",
    extensions: ["mc1"],
  },
  {
    mimetype: "application/vnd.mediastation.cdkey",
    source: "iana",
    extensions: ["cdkey"],
  },
  {
    mimetype: "application/vnd.medicalholodeck.recordxr",
    source: "iana",
  },
  {
    mimetype: "application/vnd.meridian-slingshot",
    source: "iana",
  },
  {
    mimetype: "application/vnd.mermaid",
    source: "iana",
  },
  {
    mimetype: "application/vnd.mfer",
    source: "iana",
    extensions: ["mwf"],
  },
  {
    mimetype: "application/vnd.mfmp",
    source: "iana",
    extensions: ["mfm"],
  },
  {
    mimetype: "application/vnd.micro+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.micrografx.flo",
    source: "iana",
    extensions: ["flo"],
  },
  {
    mimetype: "application/vnd.micrografx.igx",
    source: "iana",
    extensions: ["igx"],
  },
  {
    mimetype: "application/vnd.microsoft.portable-executable",
    source: "iana",
  },
  {
    mimetype: "application/vnd.microsoft.windows.thumbnail-cache",
    source: "iana",
  },
  {
    mimetype: "application/vnd.miele+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.mif",
    source: "iana",
    extensions: ["mif"],
  },
  {
    mimetype: "application/vnd.minisoft-hp3000-save",
    source: "iana",
  },
  {
    mimetype: "application/vnd.mitsubishi.misty-guard.trustweb",
    source: "iana",
  },
  {
    mimetype: "application/vnd.mobius.daf",
    source: "iana",
    extensions: ["daf"],
  },
  {
    mimetype: "application/vnd.mobius.dis",
    source: "iana",
    extensions: ["dis"],
  },
  {
    mimetype: "application/vnd.mobius.mbk",
    source: "iana",
    extensions: ["mbk"],
  },
  {
    mimetype: "application/vnd.mobius.mqy",
    source: "iana",
    extensions: ["mqy"],
  },
  {
    mimetype: "application/vnd.mobius.msl",
    source: "iana",
    extensions: ["msl"],
  },
  {
    mimetype: "application/vnd.mobius.plc",
    source: "iana",
    extensions: ["plc"],
  },
  {
    mimetype: "application/vnd.mobius.txf",
    source: "iana",
    extensions: ["txf"],
  },
  {
    mimetype: "application/vnd.modl",
    source: "iana",
  },
  {
    mimetype: "application/vnd.mophun.application",
    source: "iana",
    extensions: ["mpn"],
  },
  {
    mimetype: "application/vnd.mophun.certificate",
    source: "iana",
    extensions: ["mpc"],
  },
  {
    mimetype: "application/vnd.motorola.flexsuite",
    source: "iana",
  },
  {
    mimetype: "application/vnd.motorola.flexsuite.adsi",
    source: "iana",
  },
  {
    mimetype: "application/vnd.motorola.flexsuite.fis",
    source: "iana",
  },
  {
    mimetype: "application/vnd.motorola.flexsuite.gotap",
    source: "iana",
  },
  {
    mimetype: "application/vnd.motorola.flexsuite.kmr",
    source: "iana",
  },
  {
    mimetype: "application/vnd.motorola.flexsuite.ttc",
    source: "iana",
  },
  {
    mimetype: "application/vnd.motorola.flexsuite.wem",
    source: "iana",
  },
  {
    mimetype: "application/vnd.motorola.iprm",
    source: "iana",
  },
  {
    mimetype: "application/vnd.mozilla.xul+xml",
    source: "iana",
    compressible: true,
    extensions: ["xul"],
  },
  {
    mimetype: "application/vnd.ms-3mfdocument",
    source: "iana",
  },
  {
    mimetype: "application/vnd.ms-artgalry",
    source: "iana",
    extensions: ["cil"],
  },
  {
    mimetype: "application/vnd.ms-asf",
    source: "iana",
  },
  {
    mimetype: "application/vnd.ms-cab-compressed",
    source: "iana",
    extensions: ["cab"],
  },
  {
    mimetype: "application/vnd.ms-color.iccprofile",
    source: "apache",
  },
  {
    mimetype: "application/vnd.ms-excel",
    source: "iana",
    compressible: false,
    extensions: ["xls", "xlm", "xla", "xlc", "xlt", "xlw"],
  },
  {
    mimetype: "application/vnd.ms-excel.addin.macroenabled.12",
    source: "iana",
    extensions: ["xlam"],
  },
  {
    mimetype: "application/vnd.ms-excel.sheet.binary.macroenabled.12",
    source: "iana",
    extensions: ["xlsb"],
  },
  {
    mimetype: "application/vnd.ms-excel.sheet.macroenabled.12",
    source: "iana",
    extensions: ["xlsm"],
  },
  {
    mimetype: "application/vnd.ms-excel.template.macroenabled.12",
    source: "iana",
    extensions: ["xltm"],
  },
  {
    mimetype: "application/vnd.ms-fontobject",
    source: "iana",
    compressible: true,
    extensions: ["eot"],
  },
  {
    mimetype: "application/vnd.ms-htmlhelp",
    source: "iana",
    extensions: ["chm"],
  },
  {
    mimetype: "application/vnd.ms-ims",
    source: "iana",
    extensions: ["ims"],
  },
  {
    mimetype: "application/vnd.ms-lrm",
    source: "iana",
    extensions: ["lrm"],
  },
  {
    mimetype: "application/vnd.ms-office.activex+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.ms-officetheme",
    source: "iana",
    extensions: ["thmx"],
  },
  {
    mimetype: "application/vnd.ms-opentype",
    source: "apache",
    compressible: true,
  },
  {
    mimetype: "application/vnd.ms-outlook",
    compressible: false,
    extensions: ["msg"],
  },
  {
    mimetype: "application/vnd.ms-package.obfuscated-opentype",
    source: "apache",
  },
  {
    mimetype: "application/vnd.ms-pki.seccat",
    source: "apache",
    extensions: ["cat"],
  },
  {
    mimetype: "application/vnd.ms-pki.stl",
    source: "apache",
    extensions: ["stl"],
  },
  {
    mimetype: "application/vnd.ms-playready.initiator+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.ms-powerpoint",
    source: "iana",
    compressible: false,
    extensions: ["ppt", "pps", "pot"],
  },
  {
    mimetype: "application/vnd.ms-powerpoint.addin.macroenabled.12",
    source: "iana",
    extensions: ["ppam"],
  },
  {
    mimetype: "application/vnd.ms-powerpoint.presentation.macroenabled.12",
    source: "iana",
    extensions: ["pptm"],
  },
  {
    mimetype: "application/vnd.ms-powerpoint.slide.macroenabled.12",
    source: "iana",
    extensions: ["sldm"],
  },
  {
    mimetype: "application/vnd.ms-powerpoint.slideshow.macroenabled.12",
    source: "iana",
    extensions: ["ppsm"],
  },
  {
    mimetype: "application/vnd.ms-powerpoint.template.macroenabled.12",
    source: "iana",
    extensions: ["potm"],
  },
  {
    mimetype: "application/vnd.ms-printdevicecapabilities+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.ms-printing.printticket+xml",
    source: "apache",
    compressible: true,
  },
  {
    mimetype: "application/vnd.ms-printschematicket+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.ms-project",
    source: "iana",
    extensions: ["mpp", "mpt"],
  },
  {
    mimetype: "application/vnd.ms-tnef",
    source: "iana",
  },
  {
    mimetype: "application/vnd.ms-windows.devicepairing",
    source: "iana",
  },
  {
    mimetype: "application/vnd.ms-windows.nwprinting.oob",
    source: "iana",
  },
  {
    mimetype: "application/vnd.ms-windows.printerpairing",
    source: "iana",
  },
  {
    mimetype: "application/vnd.ms-windows.wsd.oob",
    source: "iana",
  },
  {
    mimetype: "application/vnd.ms-wmdrm.lic-chlg-req",
    source: "iana",
  },
  {
    mimetype: "application/vnd.ms-wmdrm.lic-resp",
    source: "iana",
  },
  {
    mimetype: "application/vnd.ms-wmdrm.meter-chlg-req",
    source: "iana",
  },
  {
    mimetype: "application/vnd.ms-wmdrm.meter-resp",
    source: "iana",
  },
  {
    mimetype: "application/vnd.ms-word.document.macroenabled.12",
    source: "iana",
    extensions: ["docm"],
  },
  {
    mimetype: "application/vnd.ms-word.template.macroenabled.12",
    source: "iana",
    extensions: ["dotm"],
  },
  {
    mimetype: "application/vnd.ms-works",
    source: "iana",
    extensions: ["wps", "wks", "wcm", "wdb"],
  },
  {
    mimetype: "application/vnd.ms-wpl",
    source: "iana",
    extensions: ["wpl"],
  },
  {
    mimetype: "application/vnd.ms-xpsdocument",
    source: "iana",
    compressible: false,
    extensions: ["xps"],
  },
  {
    mimetype: "application/vnd.msa-disk-image",
    source: "iana",
  },
  {
    mimetype: "application/vnd.mseq",
    source: "iana",
    extensions: ["mseq"],
  },
  {
    mimetype: "application/vnd.msgpack",
    source: "iana",
  },
  {
    mimetype: "application/vnd.msign",
    source: "iana",
  },
  {
    mimetype: "application/vnd.multiad.creator",
    source: "iana",
  },
  {
    mimetype: "application/vnd.multiad.creator.cif",
    source: "iana",
  },
  {
    mimetype: "application/vnd.music-niff",
    source: "iana",
  },
  {
    mimetype: "application/vnd.musician",
    source: "iana",
    extensions: ["mus"],
  },
  {
    mimetype: "application/vnd.muvee.style",
    source: "iana",
    extensions: ["msty"],
  },
  {
    mimetype: "application/vnd.mynfc",
    source: "iana",
    extensions: ["taglet"],
  },
  {
    mimetype: "application/vnd.nacamar.ybrid+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.nato.bindingdataobject+cbor",
    source: "iana",
  },
  {
    mimetype: "application/vnd.nato.bindingdataobject+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.nato.bindingdataobject+xml",
    source: "iana",
    compressible: true,
    extensions: ["bdo"],
  },
  {
    mimetype: "application/vnd.nato.openxmlformats-package.iepd+zip",
    source: "iana",
    compressible: false,
  },
  {
    mimetype: "application/vnd.ncd.control",
    source: "iana",
  },
  {
    mimetype: "application/vnd.ncd.reference",
    source: "iana",
  },
  {
    mimetype: "application/vnd.nearst.inv+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.nebumind.line",
    source: "iana",
  },
  {
    mimetype: "application/vnd.nervana",
    source: "iana",
  },
  {
    mimetype: "application/vnd.netfpx",
    source: "iana",
  },
  {
    mimetype: "application/vnd.neurolanguage.nlu",
    source: "iana",
    extensions: ["nlu"],
  },
  {
    mimetype: "application/vnd.nimn",
    source: "iana",
  },
  {
    mimetype: "application/vnd.nintendo.nitro.rom",
    source: "iana",
  },
  {
    mimetype: "application/vnd.nintendo.snes.rom",
    source: "iana",
  },
  {
    mimetype: "application/vnd.nitf",
    source: "iana",
    extensions: ["ntf", "nitf"],
  },
  {
    mimetype: "application/vnd.noblenet-directory",
    source: "iana",
    extensions: ["nnd"],
  },
  {
    mimetype: "application/vnd.noblenet-sealer",
    source: "iana",
    extensions: ["nns"],
  },
  {
    mimetype: "application/vnd.noblenet-web",
    source: "iana",
    extensions: ["nnw"],
  },
  {
    mimetype: "application/vnd.nokia.catalogs",
    source: "iana",
  },
  {
    mimetype: "application/vnd.nokia.conml+wbxml",
    source: "iana",
  },
  {
    mimetype: "application/vnd.nokia.conml+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.nokia.iptv.config+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.nokia.isds-radio-presets",
    source: "iana",
  },
  {
    mimetype: "application/vnd.nokia.landmark+wbxml",
    source: "iana",
  },
  {
    mimetype: "application/vnd.nokia.landmark+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.nokia.landmarkcollection+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.nokia.n-gage.ac+xml",
    source: "iana",
    compressible: true,
    extensions: ["ac"],
  },
  {
    mimetype: "application/vnd.nokia.n-gage.data",
    source: "iana",
    extensions: ["ngdat"],
  },
  {
    mimetype: "application/vnd.nokia.n-gage.symbian.install",
    source: "apache",
    extensions: ["n-gage"],
  },
  {
    mimetype: "application/vnd.nokia.ncd",
    source: "iana",
  },
  {
    mimetype: "application/vnd.nokia.pcd+wbxml",
    source: "iana",
  },
  {
    mimetype: "application/vnd.nokia.pcd+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.nokia.radio-preset",
    source: "iana",
    extensions: ["rpst"],
  },
  {
    mimetype: "application/vnd.nokia.radio-presets",
    source: "iana",
    extensions: ["rpss"],
  },
  {
    mimetype: "application/vnd.novadigm.edm",
    source: "iana",
    extensions: ["edm"],
  },
  {
    mimetype: "application/vnd.novadigm.edx",
    source: "iana",
    extensions: ["edx"],
  },
  {
    mimetype: "application/vnd.novadigm.ext",
    source: "iana",
    extensions: ["ext"],
  },
  {
    mimetype: "application/vnd.ntt-local.content-share",
    source: "iana",
  },
  {
    mimetype: "application/vnd.ntt-local.file-transfer",
    source: "iana",
  },
  {
    mimetype: "application/vnd.ntt-local.ogw_remote-access",
    source: "iana",
  },
  {
    mimetype: "application/vnd.ntt-local.sip-ta_remote",
    source: "iana",
  },
  {
    mimetype: "application/vnd.ntt-local.sip-ta_tcp_stream",
    source: "iana",
  },
  {
    mimetype: "application/vnd.oai.workflows",
    source: "iana",
  },
  {
    mimetype: "application/vnd.oai.workflows+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.oai.workflows+yaml",
    source: "iana",
  },
  {
    mimetype: "application/vnd.oasis.opendocument.base",
    source: "iana",
  },
  {
    mimetype: "application/vnd.oasis.opendocument.chart",
    source: "iana",
    extensions: ["odc"],
  },
  {
    mimetype: "application/vnd.oasis.opendocument.chart-template",
    source: "iana",
    extensions: ["otc"],
  },
  {
    mimetype: "application/vnd.oasis.opendocument.database",
    source: "apache",
    extensions: ["odb"],
  },
  {
    mimetype: "application/vnd.oasis.opendocument.formula",
    source: "iana",
    extensions: ["odf"],
  },
  {
    mimetype: "application/vnd.oasis.opendocument.formula-template",
    source: "iana",
    extensions: ["odft"],
  },
  {
    mimetype: "application/vnd.oasis.opendocument.graphics",
    source: "iana",
    compressible: false,
    extensions: ["odg"],
  },
  {
    mimetype: "application/vnd.oasis.opendocument.graphics-template",
    source: "iana",
    extensions: ["otg"],
  },
  {
    mimetype: "application/vnd.oasis.opendocument.image",
    source: "iana",
    extensions: ["odi"],
  },
  {
    mimetype: "application/vnd.oasis.opendocument.image-template",
    source: "iana",
    extensions: ["oti"],
  },
  {
    mimetype: "application/vnd.oasis.opendocument.presentation",
    source: "iana",
    compressible: false,
    extensions: ["odp"],
  },
  {
    mimetype: "application/vnd.oasis.opendocument.presentation-template",
    source: "iana",
    extensions: ["otp"],
  },
  {
    mimetype: "application/vnd.oasis.opendocument.spreadsheet",
    source: "iana",
    compressible: false,
    extensions: ["ods"],
  },
  {
    mimetype: "application/vnd.oasis.opendocument.spreadsheet-template",
    source: "iana",
    extensions: ["ots"],
  },
  {
    mimetype: "application/vnd.oasis.opendocument.text",
    source: "iana",
    compressible: false,
    extensions: ["odt"],
  },
  {
    mimetype: "application/vnd.oasis.opendocument.text-master",
    source: "iana",
    extensions: ["odm"],
  },
  {
    mimetype: "application/vnd.oasis.opendocument.text-master-template",
    source: "iana",
  },
  {
    mimetype: "application/vnd.oasis.opendocument.text-template",
    source: "iana",
    extensions: ["ott"],
  },
  {
    mimetype: "application/vnd.oasis.opendocument.text-web",
    source: "iana",
    extensions: ["oth"],
  },
  {
    mimetype: "application/vnd.obn",
    source: "iana",
  },
  {
    mimetype: "application/vnd.ocf+cbor",
    source: "iana",
  },
  {
    mimetype: "application/vnd.oci.image.manifest.v1+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.oftn.l10n+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.oipf.contentaccessdownload+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.oipf.contentaccessstreaming+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.oipf.cspg-hexbinary",
    source: "iana",
  },
  {
    mimetype: "application/vnd.oipf.dae.svg+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.oipf.dae.xhtml+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.oipf.mippvcontrolmessage+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.oipf.pae.gem",
    source: "iana",
  },
  {
    mimetype: "application/vnd.oipf.spdiscovery+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.oipf.spdlist+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.oipf.ueprofile+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.oipf.userprofile+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.olpc-sugar",
    source: "iana",
    extensions: ["xo"],
  },
  {
    mimetype: "application/vnd.oma-scws-config",
    source: "iana",
  },
  {
    mimetype: "application/vnd.oma-scws-http-request",
    source: "iana",
  },
  {
    mimetype: "application/vnd.oma-scws-http-response",
    source: "iana",
  },
  {
    mimetype: "application/vnd.oma.bcast.associated-procedure-parameter+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.oma.bcast.drm-trigger+xml",
    source: "apache",
    compressible: true,
  },
  {
    mimetype: "application/vnd.oma.bcast.imd+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.oma.bcast.ltkm",
    source: "iana",
  },
  {
    mimetype: "application/vnd.oma.bcast.notification+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.oma.bcast.provisioningtrigger",
    source: "iana",
  },
  {
    mimetype: "application/vnd.oma.bcast.sgboot",
    source: "iana",
  },
  {
    mimetype: "application/vnd.oma.bcast.sgdd+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.oma.bcast.sgdu",
    source: "iana",
  },
  {
    mimetype: "application/vnd.oma.bcast.simple-symbol-container",
    source: "iana",
  },
  {
    mimetype: "application/vnd.oma.bcast.smartcard-trigger+xml",
    source: "apache",
    compressible: true,
  },
  {
    mimetype: "application/vnd.oma.bcast.sprov+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.oma.bcast.stkm",
    source: "iana",
  },
  {
    mimetype: "application/vnd.oma.cab-address-book+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.oma.cab-feature-handler+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.oma.cab-pcc+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.oma.cab-subs-invite+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.oma.cab-user-prefs+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.oma.dcd",
    source: "iana",
  },
  {
    mimetype: "application/vnd.oma.dcdc",
    source: "iana",
  },
  {
    mimetype: "application/vnd.oma.dd2+xml",
    source: "iana",
    compressible: true,
    extensions: ["dd2"],
  },
  {
    mimetype: "application/vnd.oma.drm.risd+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.oma.group-usage-list+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.oma.lwm2m+cbor",
    source: "iana",
  },
  {
    mimetype: "application/vnd.oma.lwm2m+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.oma.lwm2m+tlv",
    source: "iana",
  },
  {
    mimetype: "application/vnd.oma.pal+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.oma.poc.detailed-progress-report+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.oma.poc.final-report+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.oma.poc.groups+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.oma.poc.invocation-descriptor+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.oma.poc.optimized-progress-report+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.oma.push",
    source: "iana",
  },
  {
    mimetype: "application/vnd.oma.scidm.messages+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.oma.xcap-directory+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.omads-email+xml",
    source: "iana",
    charset: "UTF-8",
    compressible: true,
  },
  {
    mimetype: "application/vnd.omads-file+xml",
    source: "iana",
    charset: "UTF-8",
    compressible: true,
  },
  {
    mimetype: "application/vnd.omads-folder+xml",
    source: "iana",
    charset: "UTF-8",
    compressible: true,
  },
  {
    mimetype: "application/vnd.omaloc-supl-init",
    source: "iana",
  },
  {
    mimetype: "application/vnd.onepager",
    source: "iana",
  },
  {
    mimetype: "application/vnd.onepagertamp",
    source: "iana",
  },
  {
    mimetype: "application/vnd.onepagertamx",
    source: "iana",
  },
  {
    mimetype: "application/vnd.onepagertat",
    source: "iana",
  },
  {
    mimetype: "application/vnd.onepagertatp",
    source: "iana",
  },
  {
    mimetype: "application/vnd.onepagertatx",
    source: "iana",
  },
  {
    mimetype: "application/vnd.onvif.metadata",
    source: "iana",
  },
  {
    mimetype: "application/vnd.openblox.game+xml",
    source: "iana",
    compressible: true,
    extensions: ["obgx"],
  },
  {
    mimetype: "application/vnd.openblox.game-binary",
    source: "iana",
  },
  {
    mimetype: "application/vnd.openeye.oeb",
    source: "iana",
  },
  {
    mimetype: "application/vnd.openofficeorg.extension",
    source: "apache",
    extensions: ["oxt"],
  },
  {
    mimetype: "application/vnd.openstreetmap.data+xml",
    source: "iana",
    compressible: true,
    extensions: ["osm"],
  },
  {
    mimetype: "application/vnd.opentimestamps.ots",
    source: "iana",
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.custom-properties+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.customxmlproperties+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.openxmlformats-officedocument.drawing+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.drawingml.chart+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.extended-properties+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.presentationml.comments+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    source: "iana",
    compressible: false,
    extensions: ["pptx"],
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.presentationml.slide",
    source: "iana",
    extensions: ["sldx"],
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.presentationml.slide+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
    source: "iana",
    extensions: ["ppsx"],
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.presentationml.tags+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.presentationml.template",
    source: "iana",
    extensions: ["potx"],
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    source: "iana",
    compressible: false,
    extensions: ["xlsx"],
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
    source: "iana",
    extensions: ["xltx"],
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.openxmlformats-officedocument.theme+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.openxmlformats-officedocument.themeoverride+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.openxmlformats-officedocument.vmldrawing",
    source: "iana",
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    source: "iana",
    compressible: false,
    extensions: ["docx"],
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
    source: "iana",
    extensions: ["dotx"],
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.openxmlformats-package.core-properties+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype:
      "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.openxmlformats-package.relationships+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.oracle.resource+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.orange.indata",
    source: "iana",
  },
  {
    mimetype: "application/vnd.osa.netdeploy",
    source: "iana",
  },
  {
    mimetype: "application/vnd.osgeo.mapguide.package",
    source: "iana",
    extensions: ["mgp"],
  },
  {
    mimetype: "application/vnd.osgi.bundle",
    source: "iana",
  },
  {
    mimetype: "application/vnd.osgi.dp",
    source: "iana",
    extensions: ["dp"],
  },
  {
    mimetype: "application/vnd.osgi.subsystem",
    source: "iana",
    extensions: ["esa"],
  },
  {
    mimetype: "application/vnd.otps.ct-kip+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.oxli.countgraph",
    source: "iana",
  },
  {
    mimetype: "application/vnd.pagerduty+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.palm",
    source: "iana",
    extensions: ["pdb", "pqa", "oprc"],
  },
  {
    mimetype: "application/vnd.panoply",
    source: "iana",
  },
  {
    mimetype: "application/vnd.paos.xml",
    source: "iana",
  },
  {
    mimetype: "application/vnd.patentdive",
    source: "iana",
  },
  {
    mimetype: "application/vnd.patientecommsdoc",
    source: "iana",
  },
  {
    mimetype: "application/vnd.pawaafile",
    source: "iana",
    extensions: ["paw"],
  },
  {
    mimetype: "application/vnd.pcos",
    source: "iana",
  },
  {
    mimetype: "application/vnd.pg.format",
    source: "iana",
    extensions: ["str"],
  },
  {
    mimetype: "application/vnd.pg.osasli",
    source: "iana",
    extensions: ["ei6"],
  },
  {
    mimetype: "application/vnd.piaccess.application-licence",
    source: "iana",
  },
  {
    mimetype: "application/vnd.picsel",
    source: "iana",
    extensions: ["efif"],
  },
  {
    mimetype: "application/vnd.pmi.widget",
    source: "iana",
    extensions: ["wg"],
  },
  {
    mimetype: "application/vnd.poc.group-advertisement+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.pocketlearn",
    source: "iana",
    extensions: ["plf"],
  },
  {
    mimetype: "application/vnd.powerbuilder6",
    source: "iana",
    extensions: ["pbd"],
  },
  {
    mimetype: "application/vnd.powerbuilder6-s",
    source: "iana",
  },
  {
    mimetype: "application/vnd.powerbuilder7",
    source: "iana",
  },
  {
    mimetype: "application/vnd.powerbuilder7-s",
    source: "iana",
  },
  {
    mimetype: "application/vnd.powerbuilder75",
    source: "iana",
  },
  {
    mimetype: "application/vnd.powerbuilder75-s",
    source: "iana",
  },
  {
    mimetype: "application/vnd.preminet",
    source: "iana",
  },
  {
    mimetype: "application/vnd.previewsystems.box",
    source: "iana",
    extensions: ["box"],
  },
  {
    mimetype: "application/vnd.proteus.magazine",
    source: "iana",
    extensions: ["mgz"],
  },
  {
    mimetype: "application/vnd.psfs",
    source: "iana",
  },
  {
    mimetype: "application/vnd.pt.mundusmundi",
    source: "iana",
  },
  {
    mimetype: "application/vnd.publishare-delta-tree",
    source: "iana",
    extensions: ["qps"],
  },
  {
    mimetype: "application/vnd.pvi.ptid1",
    source: "iana",
    extensions: ["ptid"],
  },
  {
    mimetype: "application/vnd.pwg-multiplexed",
    source: "iana",
  },
  {
    mimetype: "application/vnd.pwg-xhtml-print+xml",
    source: "iana",
    compressible: true,
    extensions: ["xhtm"],
  },
  {
    mimetype: "application/vnd.qualcomm.brew-app-res",
    source: "iana",
  },
  {
    mimetype: "application/vnd.quarantainenet",
    source: "iana",
  },
  {
    mimetype: "application/vnd.quark.quarkxpress",
    source: "iana",
    extensions: ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"],
  },
  {
    mimetype: "application/vnd.quobject-quoxdocument",
    source: "iana",
  },
  {
    mimetype: "application/vnd.radisys.moml+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.radisys.msml+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.radisys.msml-audit+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.radisys.msml-audit-conf+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.radisys.msml-audit-conn+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.radisys.msml-audit-dialog+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.radisys.msml-audit-stream+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.radisys.msml-conf+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.radisys.msml-dialog+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.radisys.msml-dialog-base+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.radisys.msml-dialog-fax-detect+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.radisys.msml-dialog-fax-sendrecv+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.radisys.msml-dialog-group+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.radisys.msml-dialog-speech+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.radisys.msml-dialog-transform+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.rainstor.data",
    source: "iana",
  },
  {
    mimetype: "application/vnd.rapid",
    source: "iana",
  },
  {
    mimetype: "application/vnd.rar",
    source: "iana",
    extensions: ["rar"],
  },
  {
    mimetype: "application/vnd.realvnc.bed",
    source: "iana",
    extensions: ["bed"],
  },
  {
    mimetype: "application/vnd.recordare.musicxml",
    source: "iana",
    extensions: ["mxl"],
  },
  {
    mimetype: "application/vnd.recordare.musicxml+xml",
    source: "iana",
    compressible: true,
    extensions: ["musicxml"],
  },
  {
    mimetype: "application/vnd.relpipe",
    source: "iana",
  },
  {
    mimetype: "application/vnd.renlearn.rlprint",
    source: "iana",
  },
  {
    mimetype: "application/vnd.resilient.logic",
    source: "iana",
  },
  {
    mimetype: "application/vnd.restful+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.rig.cryptonote",
    source: "iana",
    extensions: ["cryptonote"],
  },
  {
    mimetype: "application/vnd.rim.cod",
    source: "apache",
    extensions: ["cod"],
  },
  {
    mimetype: "application/vnd.rn-realmedia",
    source: "apache",
    extensions: ["rm"],
  },
  {
    mimetype: "application/vnd.rn-realmedia-vbr",
    source: "apache",
    extensions: ["rmvb"],
  },
  {
    mimetype: "application/vnd.route66.link66+xml",
    source: "iana",
    compressible: true,
    extensions: ["link66"],
  },
  {
    mimetype: "application/vnd.rs-274x",
    source: "iana",
  },
  {
    mimetype: "application/vnd.ruckus.download",
    source: "iana",
  },
  {
    mimetype: "application/vnd.s3sms",
    source: "iana",
  },
  {
    mimetype: "application/vnd.sailingtracker.track",
    source: "iana",
    extensions: ["st"],
  },
  {
    mimetype: "application/vnd.sar",
    source: "iana",
  },
  {
    mimetype: "application/vnd.sbm.cid",
    source: "iana",
  },
  {
    mimetype: "application/vnd.sbm.mid2",
    source: "iana",
  },
  {
    mimetype: "application/vnd.scribus",
    source: "iana",
  },
  {
    mimetype: "application/vnd.sealed.3df",
    source: "iana",
  },
  {
    mimetype: "application/vnd.sealed.csf",
    source: "iana",
  },
  {
    mimetype: "application/vnd.sealed.doc",
    source: "iana",
  },
  {
    mimetype: "application/vnd.sealed.eml",
    source: "iana",
  },
  {
    mimetype: "application/vnd.sealed.mht",
    source: "iana",
  },
  {
    mimetype: "application/vnd.sealed.net",
    source: "iana",
  },
  {
    mimetype: "application/vnd.sealed.ppt",
    source: "iana",
  },
  {
    mimetype: "application/vnd.sealed.tiff",
    source: "iana",
  },
  {
    mimetype: "application/vnd.sealed.xls",
    source: "iana",
  },
  {
    mimetype: "application/vnd.sealedmedia.softseal.html",
    source: "iana",
  },
  {
    mimetype: "application/vnd.sealedmedia.softseal.pdf",
    source: "iana",
  },
  {
    mimetype: "application/vnd.seemail",
    source: "iana",
    extensions: ["see"],
  },
  {
    mimetype: "application/vnd.seis+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.sema",
    source: "iana",
    extensions: ["sema"],
  },
  {
    mimetype: "application/vnd.semd",
    source: "iana",
    extensions: ["semd"],
  },
  {
    mimetype: "application/vnd.semf",
    source: "iana",
    extensions: ["semf"],
  },
  {
    mimetype: "application/vnd.shade-save-file",
    source: "iana",
  },
  {
    mimetype: "application/vnd.shana.informed.formdata",
    source: "iana",
    extensions: ["ifm"],
  },
  {
    mimetype: "application/vnd.shana.informed.formtemplate",
    source: "iana",
    extensions: ["itp"],
  },
  {
    mimetype: "application/vnd.shana.informed.interchange",
    source: "iana",
    extensions: ["iif"],
  },
  {
    mimetype: "application/vnd.shana.informed.package",
    source: "iana",
    extensions: ["ipk"],
  },
  {
    mimetype: "application/vnd.shootproof+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.shopkick+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.shp",
    source: "iana",
  },
  {
    mimetype: "application/vnd.shx",
    source: "iana",
  },
  {
    mimetype: "application/vnd.sigrok.session",
    source: "iana",
  },
  {
    mimetype: "application/vnd.simtech-mindmapper",
    source: "iana",
    extensions: ["twd", "twds"],
  },
  {
    mimetype: "application/vnd.siren+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.smaf",
    source: "iana",
    extensions: ["mmf"],
  },
  {
    mimetype: "application/vnd.smart.notebook",
    source: "iana",
  },
  {
    mimetype: "application/vnd.smart.teacher",
    source: "iana",
    extensions: ["teacher"],
  },
  {
    mimetype: "application/vnd.smintio.portals.archive",
    source: "iana",
  },
  {
    mimetype: "application/vnd.snesdev-page-table",
    source: "iana",
  },
  {
    mimetype: "application/vnd.software602.filler.form+xml",
    source: "iana",
    compressible: true,
    extensions: ["fo"],
  },
  {
    mimetype: "application/vnd.software602.filler.form-xml-zip",
    source: "iana",
  },
  {
    mimetype: "application/vnd.solent.sdkm+xml",
    source: "iana",
    compressible: true,
    extensions: ["sdkm", "sdkd"],
  },
  {
    mimetype: "application/vnd.spotfire.dxp",
    source: "iana",
    extensions: ["dxp"],
  },
  {
    mimetype: "application/vnd.spotfire.sfs",
    source: "iana",
    extensions: ["sfs"],
  },
  {
    mimetype: "application/vnd.sqlite3",
    source: "iana",
  },
  {
    mimetype: "application/vnd.sss-cod",
    source: "iana",
  },
  {
    mimetype: "application/vnd.sss-dtf",
    source: "iana",
  },
  {
    mimetype: "application/vnd.sss-ntf",
    source: "iana",
  },
  {
    mimetype: "application/vnd.stardivision.calc",
    source: "apache",
    extensions: ["sdc"],
  },
  {
    mimetype: "application/vnd.stardivision.draw",
    source: "apache",
    extensions: ["sda"],
  },
  {
    mimetype: "application/vnd.stardivision.impress",
    source: "apache",
    extensions: ["sdd"],
  },
  {
    mimetype: "application/vnd.stardivision.math",
    source: "apache",
    extensions: ["smf"],
  },
  {
    mimetype: "application/vnd.stardivision.writer",
    source: "apache",
    extensions: ["sdw", "vor"],
  },
  {
    mimetype: "application/vnd.stardivision.writer-global",
    source: "apache",
    extensions: ["sgl"],
  },
  {
    mimetype: "application/vnd.stepmania.package",
    source: "iana",
    extensions: ["smzip"],
  },
  {
    mimetype: "application/vnd.stepmania.stepchart",
    source: "iana",
    extensions: ["sm"],
  },
  {
    mimetype: "application/vnd.street-stream",
    source: "iana",
  },
  {
    mimetype: "application/vnd.sun.wadl+xml",
    source: "iana",
    compressible: true,
    extensions: ["wadl"],
  },
  {
    mimetype: "application/vnd.sun.xml.calc",
    source: "apache",
    extensions: ["sxc"],
  },
  {
    mimetype: "application/vnd.sun.xml.calc.template",
    source: "apache",
    extensions: ["stc"],
  },
  {
    mimetype: "application/vnd.sun.xml.draw",
    source: "apache",
    extensions: ["sxd"],
  },
  {
    mimetype: "application/vnd.sun.xml.draw.template",
    source: "apache",
    extensions: ["std"],
  },
  {
    mimetype: "application/vnd.sun.xml.impress",
    source: "apache",
    extensions: ["sxi"],
  },
  {
    mimetype: "application/vnd.sun.xml.impress.template",
    source: "apache",
    extensions: ["sti"],
  },
  {
    mimetype: "application/vnd.sun.xml.math",
    source: "apache",
    extensions: ["sxm"],
  },
  {
    mimetype: "application/vnd.sun.xml.writer",
    source: "apache",
    extensions: ["sxw"],
  },
  {
    mimetype: "application/vnd.sun.xml.writer.global",
    source: "apache",
    extensions: ["sxg"],
  },
  {
    mimetype: "application/vnd.sun.xml.writer.template",
    source: "apache",
    extensions: ["stw"],
  },
  {
    mimetype: "application/vnd.sus-calendar",
    source: "iana",
    extensions: ["sus", "susp"],
  },
  {
    mimetype: "application/vnd.svd",
    source: "iana",
    extensions: ["svd"],
  },
  {
    mimetype: "application/vnd.swiftview-ics",
    source: "iana",
  },
  {
    mimetype: "application/vnd.sybyl.mol2",
    source: "iana",
  },
  {
    mimetype: "application/vnd.sycle+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.syft+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.symbian.install",
    source: "apache",
    extensions: ["sis", "sisx"],
  },
  {
    mimetype: "application/vnd.syncml+xml",
    source: "iana",
    charset: "UTF-8",
    compressible: true,
    extensions: ["xsm"],
  },
  {
    mimetype: "application/vnd.syncml.dm+wbxml",
    source: "iana",
    charset: "UTF-8",
    extensions: ["bdm"],
  },
  {
    mimetype: "application/vnd.syncml.dm+xml",
    source: "iana",
    charset: "UTF-8",
    compressible: true,
    extensions: ["xdm"],
  },
  {
    mimetype: "application/vnd.syncml.dm.notification",
    source: "iana",
  },
  {
    mimetype: "application/vnd.syncml.dmddf+wbxml",
    source: "iana",
  },
  {
    mimetype: "application/vnd.syncml.dmddf+xml",
    source: "iana",
    charset: "UTF-8",
    compressible: true,
    extensions: ["ddf"],
  },
  {
    mimetype: "application/vnd.syncml.dmtnds+wbxml",
    source: "iana",
  },
  {
    mimetype: "application/vnd.syncml.dmtnds+xml",
    source: "iana",
    charset: "UTF-8",
    compressible: true,
  },
  {
    mimetype: "application/vnd.syncml.ds.notification",
    source: "iana",
  },
  {
    mimetype: "application/vnd.tableschema+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.tao.intent-module-archive",
    source: "iana",
    extensions: ["tao"],
  },
  {
    mimetype: "application/vnd.tcpdump.pcap",
    source: "iana",
    extensions: ["pcap", "cap", "dmp"],
  },
  {
    mimetype: "application/vnd.think-cell.ppttc+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.tmd.mediaflex.api+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.tml",
    source: "iana",
  },
  {
    mimetype: "application/vnd.tmobile-livetv",
    source: "iana",
    extensions: ["tmo"],
  },
  {
    mimetype: "application/vnd.tri.onesource",
    source: "iana",
  },
  {
    mimetype: "application/vnd.trid.tpt",
    source: "iana",
    extensions: ["tpt"],
  },
  {
    mimetype: "application/vnd.triscape.mxs",
    source: "iana",
    extensions: ["mxs"],
  },
  {
    mimetype: "application/vnd.trueapp",
    source: "iana",
    extensions: ["tra"],
  },
  {
    mimetype: "application/vnd.truedoc",
    source: "iana",
  },
  {
    mimetype: "application/vnd.ubisoft.webplayer",
    source: "iana",
  },
  {
    mimetype: "application/vnd.ufdl",
    source: "iana",
    extensions: ["ufd", "ufdl"],
  },
  {
    mimetype: "application/vnd.uiq.theme",
    source: "iana",
    extensions: ["utz"],
  },
  {
    mimetype: "application/vnd.umajin",
    source: "iana",
    extensions: ["umj"],
  },
  {
    mimetype: "application/vnd.unity",
    source: "iana",
    extensions: ["unityweb"],
  },
  {
    mimetype: "application/vnd.uoml+xml",
    source: "iana",
    compressible: true,
    extensions: ["uoml", "uo"],
  },
  {
    mimetype: "application/vnd.uplanet.alert",
    source: "iana",
  },
  {
    mimetype: "application/vnd.uplanet.alert-wbxml",
    source: "iana",
  },
  {
    mimetype: "application/vnd.uplanet.bearer-choice",
    source: "iana",
  },
  {
    mimetype: "application/vnd.uplanet.bearer-choice-wbxml",
    source: "iana",
  },
  {
    mimetype: "application/vnd.uplanet.cacheop",
    source: "iana",
  },
  {
    mimetype: "application/vnd.uplanet.cacheop-wbxml",
    source: "iana",
  },
  {
    mimetype: "application/vnd.uplanet.channel",
    source: "iana",
  },
  {
    mimetype: "application/vnd.uplanet.channel-wbxml",
    source: "iana",
  },
  {
    mimetype: "application/vnd.uplanet.list",
    source: "iana",
  },
  {
    mimetype: "application/vnd.uplanet.list-wbxml",
    source: "iana",
  },
  {
    mimetype: "application/vnd.uplanet.listcmd",
    source: "iana",
  },
  {
    mimetype: "application/vnd.uplanet.listcmd-wbxml",
    source: "iana",
  },
  {
    mimetype: "application/vnd.uplanet.signal",
    source: "iana",
  },
  {
    mimetype: "application/vnd.uri-map",
    source: "iana",
  },
  {
    mimetype: "application/vnd.valve.source.material",
    source: "iana",
  },
  {
    mimetype: "application/vnd.vcx",
    source: "iana",
    extensions: ["vcx"],
  },
  {
    mimetype: "application/vnd.vd-study",
    source: "iana",
  },
  {
    mimetype: "application/vnd.vectorworks",
    source: "iana",
  },
  {
    mimetype: "application/vnd.vel+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.verimatrix.vcas",
    source: "iana",
  },
  {
    mimetype: "application/vnd.veritone.aion+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.veryant.thin",
    source: "iana",
  },
  {
    mimetype: "application/vnd.ves.encrypted",
    source: "iana",
  },
  {
    mimetype: "application/vnd.vidsoft.vidconference",
    source: "iana",
  },
  {
    mimetype: "application/vnd.visio",
    source: "iana",
    extensions: ["vsd", "vst", "vss", "vsw"],
  },
  {
    mimetype: "application/vnd.visionary",
    source: "iana",
    extensions: ["vis"],
  },
  {
    mimetype: "application/vnd.vividence.scriptfile",
    source: "iana",
  },
  {
    mimetype: "application/vnd.vsf",
    source: "iana",
    extensions: ["vsf"],
  },
  {
    mimetype: "application/vnd.wap.sic",
    source: "iana",
  },
  {
    mimetype: "application/vnd.wap.slc",
    source: "iana",
  },
  {
    mimetype: "application/vnd.wap.wbxml",
    source: "iana",
    charset: "UTF-8",
    extensions: ["wbxml"],
  },
  {
    mimetype: "application/vnd.wap.wmlc",
    source: "iana",
    extensions: ["wmlc"],
  },
  {
    mimetype: "application/vnd.wap.wmlscriptc",
    source: "iana",
    extensions: ["wmlsc"],
  },
  {
    mimetype: "application/vnd.wasmflow.wafl",
    source: "iana",
  },
  {
    mimetype: "application/vnd.webturbo",
    source: "iana",
    extensions: ["wtb"],
  },
  {
    mimetype: "application/vnd.wfa.dpp",
    source: "iana",
  },
  {
    mimetype: "application/vnd.wfa.p2p",
    source: "iana",
  },
  {
    mimetype: "application/vnd.wfa.wsc",
    source: "iana",
  },
  {
    mimetype: "application/vnd.windows.devicepairing",
    source: "iana",
  },
  {
    mimetype: "application/vnd.wmc",
    source: "iana",
  },
  {
    mimetype: "application/vnd.wmf.bootstrap",
    source: "iana",
  },
  {
    mimetype: "application/vnd.wolfram.mathematica",
    source: "iana",
  },
  {
    mimetype: "application/vnd.wolfram.mathematica.package",
    source: "iana",
  },
  {
    mimetype: "application/vnd.wolfram.player",
    source: "iana",
    extensions: ["nbp"],
  },
  {
    mimetype: "application/vnd.wordlift",
    source: "iana",
  },
  {
    mimetype: "application/vnd.wordperfect",
    source: "iana",
    extensions: ["wpd"],
  },
  {
    mimetype: "application/vnd.wqd",
    source: "iana",
    extensions: ["wqd"],
  },
  {
    mimetype: "application/vnd.wrq-hp3000-labelled",
    source: "iana",
  },
  {
    mimetype: "application/vnd.wt.stf",
    source: "iana",
    extensions: ["stf"],
  },
  {
    mimetype: "application/vnd.wv.csp+wbxml",
    source: "iana",
  },
  {
    mimetype: "application/vnd.wv.csp+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.wv.ssp+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.xacml+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.xara",
    source: "iana",
    extensions: ["xar"],
  },
  {
    mimetype: "application/vnd.xecrets-encrypted",
    source: "iana",
  },
  {
    mimetype: "application/vnd.xfdl",
    source: "iana",
    extensions: ["xfdl"],
  },
  {
    mimetype: "application/vnd.xfdl.webform",
    source: "iana",
  },
  {
    mimetype: "application/vnd.xmi+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vnd.xmpie.cpkg",
    source: "iana",
  },
  {
    mimetype: "application/vnd.xmpie.dpkg",
    source: "iana",
  },
  {
    mimetype: "application/vnd.xmpie.plan",
    source: "iana",
  },
  {
    mimetype: "application/vnd.xmpie.ppkg",
    source: "iana",
  },
  {
    mimetype: "application/vnd.xmpie.xlim",
    source: "iana",
  },
  {
    mimetype: "application/vnd.yamaha.hv-dic",
    source: "iana",
    extensions: ["hvd"],
  },
  {
    mimetype: "application/vnd.yamaha.hv-script",
    source: "iana",
    extensions: ["hvs"],
  },
  {
    mimetype: "application/vnd.yamaha.hv-voice",
    source: "iana",
    extensions: ["hvp"],
  },
  {
    mimetype: "application/vnd.yamaha.openscoreformat",
    source: "iana",
    extensions: ["osf"],
  },
  {
    mimetype: "application/vnd.yamaha.openscoreformat.osfpvg+xml",
    source: "iana",
    compressible: true,
    extensions: ["osfpvg"],
  },
  {
    mimetype: "application/vnd.yamaha.remote-setup",
    source: "iana",
  },
  {
    mimetype: "application/vnd.yamaha.smaf-audio",
    source: "iana",
    extensions: ["saf"],
  },
  {
    mimetype: "application/vnd.yamaha.smaf-phrase",
    source: "iana",
    extensions: ["spf"],
  },
  {
    mimetype: "application/vnd.yamaha.through-ngn",
    source: "iana",
  },
  {
    mimetype: "application/vnd.yamaha.tunnel-udpencap",
    source: "iana",
  },
  {
    mimetype: "application/vnd.yaoweme",
    source: "iana",
  },
  {
    mimetype: "application/vnd.yellowriver-custom-menu",
    source: "iana",
    extensions: ["cmp"],
  },
  {
    mimetype: "application/vnd.zul",
    source: "iana",
    extensions: ["zir", "zirz"],
  },
  {
    mimetype: "application/vnd.zzazz.deck+xml",
    source: "iana",
    compressible: true,
    extensions: ["zaz"],
  },
  {
    mimetype: "application/voicexml+xml",
    source: "iana",
    compressible: true,
    extensions: ["vxml"],
  },
  {
    mimetype: "application/voucher-cms+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/vp",
    source: "iana",
  },
  {
    mimetype: "application/vq-rtcpxr",
    source: "iana",
  },
  {
    mimetype: "application/wasm",
    source: "iana",
    compressible: true,
    extensions: ["wasm"],
  },
  {
    mimetype: "application/watcherinfo+xml",
    source: "iana",
    compressible: true,
    extensions: ["wif"],
  },
  {
    mimetype: "application/webpush-options+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/whoispp-query",
    source: "iana",
  },
  {
    mimetype: "application/whoispp-response",
    source: "iana",
  },
  {
    mimetype: "application/widget",
    source: "iana",
    extensions: ["wgt"],
  },
  {
    mimetype: "application/winhlp",
    source: "apache",
    extensions: ["hlp"],
  },
  {
    mimetype: "application/wita",
    source: "iana",
  },
  {
    mimetype: "application/wordperfect5.1",
    source: "iana",
  },
  {
    mimetype: "application/wsdl+xml",
    source: "iana",
    compressible: true,
    extensions: ["wsdl"],
  },
  {
    mimetype: "application/wspolicy+xml",
    source: "iana",
    compressible: true,
    extensions: ["wspolicy"],
  },
  {
    mimetype: "application/x-7z-compressed",
    source: "apache",
    compressible: false,
    extensions: ["7z"],
  },
  {
    mimetype: "application/x-abiword",
    source: "apache",
    extensions: ["abw"],
  },
  {
    mimetype: "application/x-ace-compressed",
    source: "apache",
    extensions: ["ace"],
  },
  {
    mimetype: "application/x-amf",
    source: "apache",
  },
  {
    mimetype: "application/x-apple-diskimage",
    source: "apache",
    extensions: ["dmg"],
  },
  {
    mimetype: "application/x-arj",
    compressible: false,
    extensions: ["arj"],
  },
  {
    mimetype: "application/x-authorware-bin",
    source: "apache",
    extensions: ["aab", "x32", "u32", "vox"],
  },
  {
    mimetype: "application/x-authorware-map",
    source: "apache",
    extensions: ["aam"],
  },
  {
    mimetype: "application/x-authorware-seg",
    source: "apache",
    extensions: ["aas"],
  },
  {
    mimetype: "application/x-bcpio",
    source: "apache",
    extensions: ["bcpio"],
  },
  {
    mimetype: "application/x-bdoc",
    compressible: false,
    extensions: ["bdoc"],
  },
  {
    mimetype: "application/x-bittorrent",
    source: "apache",
    extensions: ["torrent"],
  },
  {
    mimetype: "application/x-blorb",
    source: "apache",
    extensions: ["blb", "blorb"],
  },
  {
    mimetype: "application/x-bzip",
    source: "apache",
    compressible: false,
    extensions: ["bz"],
  },
  {
    mimetype: "application/x-bzip2",
    source: "apache",
    compressible: false,
    extensions: ["bz2", "boz"],
  },
  {
    mimetype: "application/x-cbr",
    source: "apache",
    extensions: ["cbr", "cba", "cbt", "cbz", "cb7"],
  },
  {
    mimetype: "application/x-cdlink",
    source: "apache",
    extensions: ["vcd"],
  },
  {
    mimetype: "application/x-cfs-compressed",
    source: "apache",
    extensions: ["cfs"],
  },
  {
    mimetype: "application/x-chat",
    source: "apache",
    extensions: ["chat"],
  },
  {
    mimetype: "application/x-chess-pgn",
    source: "apache",
    extensions: ["pgn"],
  },
  {
    mimetype: "application/x-chrome-extension",
    extensions: ["crx"],
  },
  {
    mimetype: "application/x-cocoa",
    source: "nginx",
    extensions: ["cco"],
  },
  {
    mimetype: "application/x-compress",
    source: "apache",
  },
  {
    mimetype: "application/x-conference",
    source: "apache",
    extensions: ["nsc"],
  },
  {
    mimetype: "application/x-cpio",
    source: "apache",
    extensions: ["cpio"],
  },
  {
    mimetype: "application/x-csh",
    source: "apache",
    extensions: ["csh"],
  },
  {
    mimetype: "application/x-deb",
    compressible: false,
  },
  {
    mimetype: "application/x-debian-package",
    source: "apache",
    extensions: ["deb", "udeb"],
  },
  {
    mimetype: "application/x-dgc-compressed",
    source: "apache",
    extensions: ["dgc"],
  },
  {
    mimetype: "application/x-director",
    source: "apache",
    extensions: ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"],
  },
  {
    mimetype: "application/x-doom",
    source: "apache",
    extensions: ["wad"],
  },
  {
    mimetype: "application/x-dtbncx+xml",
    source: "apache",
    compressible: true,
    extensions: ["ncx"],
  },
  {
    mimetype: "application/x-dtbook+xml",
    source: "apache",
    compressible: true,
    extensions: ["dtb"],
  },
  {
    mimetype: "application/x-dtbresource+xml",
    source: "apache",
    compressible: true,
    extensions: ["res"],
  },
  {
    mimetype: "application/x-dvi",
    source: "apache",
    compressible: false,
    extensions: ["dvi"],
  },
  {
    mimetype: "application/x-envoy",
    source: "apache",
    extensions: ["evy"],
  },
  {
    mimetype: "application/x-eva",
    source: "apache",
    extensions: ["eva"],
  },
  {
    mimetype: "application/x-font-bdf",
    source: "apache",
    extensions: ["bdf"],
  },
  {
    mimetype: "application/x-font-dos",
    source: "apache",
  },
  {
    mimetype: "application/x-font-framemaker",
    source: "apache",
  },
  {
    mimetype: "application/x-font-ghostscript",
    source: "apache",
    extensions: ["gsf"],
  },
  {
    mimetype: "application/x-font-libgrx",
    source: "apache",
  },
  {
    mimetype: "application/x-font-linux-psf",
    source: "apache",
    extensions: ["psf"],
  },
  {
    mimetype: "application/x-font-pcf",
    source: "apache",
    extensions: ["pcf"],
  },
  {
    mimetype: "application/x-font-snf",
    source: "apache",
    extensions: ["snf"],
  },
  {
    mimetype: "application/x-font-speedo",
    source: "apache",
  },
  {
    mimetype: "application/x-font-sunos-news",
    source: "apache",
  },
  {
    mimetype: "application/x-font-type1",
    source: "apache",
    extensions: ["pfa", "pfb", "pfm", "afm"],
  },
  {
    mimetype: "application/x-font-vfont",
    source: "apache",
  },
  {
    mimetype: "application/x-freearc",
    source: "apache",
    extensions: ["arc"],
  },
  {
    mimetype: "application/x-futuresplash",
    source: "apache",
    extensions: ["spl"],
  },
  {
    mimetype: "application/x-gca-compressed",
    source: "apache",
    extensions: ["gca"],
  },
  {
    mimetype: "application/x-glulx",
    source: "apache",
    extensions: ["ulx"],
  },
  {
    mimetype: "application/x-gnumeric",
    source: "apache",
    extensions: ["gnumeric"],
  },
  {
    mimetype: "application/x-gramps-xml",
    source: "apache",
    extensions: ["gramps"],
  },
  {
    mimetype: "application/x-gtar",
    source: "apache",
    extensions: ["gtar"],
  },
  {
    mimetype: "application/x-gzip",
    source: "apache",
  },
  {
    mimetype: "application/x-hdf",
    source: "apache",
    extensions: ["hdf"],
  },
  {
    mimetype: "application/x-httpd-php",
    compressible: true,
    extensions: ["php"],
  },
  {
    mimetype: "application/x-install-instructions",
    source: "apache",
    extensions: ["install"],
  },
  {
    mimetype: "application/x-iso9660-image",
    source: "apache",
    extensions: ["iso"],
  },
  {
    mimetype: "application/x-iwork-keynote-sffkey",
    extensions: ["key"],
  },
  {
    mimetype: "application/x-iwork-numbers-sffnumbers",
    extensions: ["numbers"],
  },
  {
    mimetype: "application/x-iwork-pages-sffpages",
    extensions: ["pages"],
  },
  {
    mimetype: "application/x-java-archive-diff",
    source: "nginx",
    extensions: ["jardiff"],
  },
  {
    mimetype: "application/x-java-jnlp-file",
    source: "apache",
    compressible: false,
    extensions: ["jnlp"],
  },
  {
    mimetype: "application/x-javascript",
    compressible: true,
  },
  {
    mimetype: "application/x-keepass2",
    extensions: ["kdbx"],
  },
  {
    mimetype: "application/x-latex",
    source: "apache",
    compressible: false,
    extensions: ["latex"],
  },
  {
    mimetype: "application/x-lua-bytecode",
    extensions: ["luac"],
  },
  {
    mimetype: "application/x-lzh-compressed",
    source: "apache",
    extensions: ["lzh", "lha"],
  },
  {
    mimetype: "application/x-makeself",
    source: "nginx",
    extensions: ["run"],
  },
  {
    mimetype: "application/x-mie",
    source: "apache",
    extensions: ["mie"],
  },
  {
    mimetype: "application/x-mobipocket-ebook",
    source: "apache",
    extensions: ["prc", "mobi"],
  },
  {
    mimetype: "application/x-mpegurl",
    compressible: false,
  },
  {
    mimetype: "application/x-ms-application",
    source: "apache",
    extensions: ["application"],
  },
  {
    mimetype: "application/x-ms-shortcut",
    source: "apache",
    extensions: ["lnk"],
  },
  {
    mimetype: "application/x-ms-wmd",
    source: "apache",
    extensions: ["wmd"],
  },
  {
    mimetype: "application/x-ms-wmz",
    source: "apache",
    extensions: ["wmz"],
  },
  {
    mimetype: "application/x-ms-xbap",
    source: "apache",
    extensions: ["xbap"],
  },
  {
    mimetype: "application/x-msaccess",
    source: "apache",
    extensions: ["mdb"],
  },
  {
    mimetype: "application/x-msbinder",
    source: "apache",
    extensions: ["obd"],
  },
  {
    mimetype: "application/x-mscardfile",
    source: "apache",
    extensions: ["crd"],
  },
  {
    mimetype: "application/x-msclip",
    source: "apache",
    extensions: ["clp"],
  },
  {
    mimetype: "application/x-msdos-program",
    extensions: ["exe"],
  },
  {
    mimetype: "application/x-msdownload",
    source: "apache",
    extensions: ["exe", "dll", "com", "bat", "msi"],
  },
  {
    mimetype: "application/x-msmediaview",
    source: "apache",
    extensions: ["mvb", "m13", "m14"],
  },
  {
    mimetype: "application/x-msmetafile",
    source: "apache",
    extensions: ["wmf", "wmz", "emf", "emz"],
  },
  {
    mimetype: "application/x-msmoney",
    source: "apache",
    extensions: ["mny"],
  },
  {
    mimetype: "application/x-mspublisher",
    source: "apache",
    extensions: ["pub"],
  },
  {
    mimetype: "application/x-msschedule",
    source: "apache",
    extensions: ["scd"],
  },
  {
    mimetype: "application/x-msterminal",
    source: "apache",
    extensions: ["trm"],
  },
  {
    mimetype: "application/x-mswrite",
    source: "apache",
    extensions: ["wri"],
  },
  {
    mimetype: "application/x-netcdf",
    source: "apache",
    extensions: ["nc", "cdf"],
  },
  {
    mimetype: "application/x-ns-proxy-autoconfig",
    compressible: true,
    extensions: ["pac"],
  },
  {
    mimetype: "application/x-nzb",
    source: "apache",
    extensions: ["nzb"],
  },
  {
    mimetype: "application/x-perl",
    source: "nginx",
    extensions: ["pl", "pm"],
  },
  {
    mimetype: "application/x-pilot",
    source: "nginx",
    extensions: ["prc", "pdb"],
  },
  {
    mimetype: "application/x-pkcs12",
    source: "apache",
    compressible: false,
    extensions: ["p12", "pfx"],
  },
  {
    mimetype: "application/x-pkcs7-certificates",
    source: "apache",
    extensions: ["p7b", "spc"],
  },
  {
    mimetype: "application/x-pkcs7-certreqresp",
    source: "apache",
    extensions: ["p7r"],
  },
  {
    mimetype: "application/x-pki-message",
    source: "iana",
  },
  {
    mimetype: "application/x-rar-compressed",
    source: "apache",
    compressible: false,
    extensions: ["rar"],
  },
  {
    mimetype: "application/x-redhat-package-manager",
    source: "nginx",
    extensions: ["rpm"],
  },
  {
    mimetype: "application/x-research-info-systems",
    source: "apache",
    extensions: ["ris"],
  },
  {
    mimetype: "application/x-sea",
    source: "nginx",
    extensions: ["sea"],
  },
  {
    mimetype: "application/x-sh",
    source: "apache",
    compressible: true,
    extensions: ["sh"],
  },
  {
    mimetype: "application/x-shar",
    source: "apache",
    extensions: ["shar"],
  },
  {
    mimetype: "application/x-shockwave-flash",
    source: "apache",
    compressible: false,
    extensions: ["swf"],
  },
  {
    mimetype: "application/x-silverlight-app",
    source: "apache",
    extensions: ["xap"],
  },
  {
    mimetype: "application/x-sql",
    source: "apache",
    extensions: ["sql"],
  },
  {
    mimetype: "application/x-stuffit",
    source: "apache",
    compressible: false,
    extensions: ["sit"],
  },
  {
    mimetype: "application/x-stuffitx",
    source: "apache",
    extensions: ["sitx"],
  },
  {
    mimetype: "application/x-subrip",
    source: "apache",
    extensions: ["srt"],
  },
  {
    mimetype: "application/x-sv4cpio",
    source: "apache",
    extensions: ["sv4cpio"],
  },
  {
    mimetype: "application/x-sv4crc",
    source: "apache",
    extensions: ["sv4crc"],
  },
  {
    mimetype: "application/x-t3vm-image",
    source: "apache",
    extensions: ["t3"],
  },
  {
    mimetype: "application/x-tads",
    source: "apache",
    extensions: ["gam"],
  },
  {
    mimetype: "application/x-tar",
    source: "apache",
    compressible: true,
    extensions: ["tar"],
  },
  {
    mimetype: "application/x-tcl",
    source: "apache",
    extensions: ["tcl", "tk"],
  },
  {
    mimetype: "application/x-tex",
    source: "apache",
    extensions: ["tex"],
  },
  {
    mimetype: "application/x-tex-tfm",
    source: "apache",
    extensions: ["tfm"],
  },
  {
    mimetype: "application/x-texinfo",
    source: "apache",
    extensions: ["texinfo", "texi"],
  },
  {
    mimetype: "application/x-tgif",
    source: "apache",
    extensions: ["obj"],
  },
  {
    mimetype: "application/x-ustar",
    source: "apache",
    extensions: ["ustar"],
  },
  {
    mimetype: "application/x-virtualbox-hdd",
    compressible: true,
    extensions: ["hdd"],
  },
  {
    mimetype: "application/x-virtualbox-ova",
    compressible: true,
    extensions: ["ova"],
  },
  {
    mimetype: "application/x-virtualbox-ovf",
    compressible: true,
    extensions: ["ovf"],
  },
  {
    mimetype: "application/x-virtualbox-vbox",
    compressible: true,
    extensions: ["vbox"],
  },
  {
    mimetype: "application/x-virtualbox-vbox-extpack",
    compressible: false,
    extensions: ["vbox-extpack"],
  },
  {
    mimetype: "application/x-virtualbox-vdi",
    compressible: true,
    extensions: ["vdi"],
  },
  {
    mimetype: "application/x-virtualbox-vhd",
    compressible: true,
    extensions: ["vhd"],
  },
  {
    mimetype: "application/x-virtualbox-vmdk",
    compressible: true,
    extensions: ["vmdk"],
  },
  {
    mimetype: "application/x-wais-source",
    source: "apache",
    extensions: ["src"],
  },
  {
    mimetype: "application/x-web-app-manifest+json",
    compressible: true,
    extensions: ["webapp"],
  },
  {
    mimetype: "application/x-www-form-urlencoded",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/x-x509-ca-cert",
    source: "iana",
    extensions: ["der", "crt", "pem"],
  },
  {
    mimetype: "application/x-x509-ca-ra-cert",
    source: "iana",
  },
  {
    mimetype: "application/x-x509-next-ca-cert",
    source: "iana",
  },
  {
    mimetype: "application/x-xfig",
    source: "apache",
    extensions: ["fig"],
  },
  {
    mimetype: "application/x-xliff+xml",
    source: "apache",
    compressible: true,
    extensions: ["xlf"],
  },
  {
    mimetype: "application/x-xpinstall",
    source: "apache",
    compressible: false,
    extensions: ["xpi"],
  },
  {
    mimetype: "application/x-xz",
    source: "apache",
    extensions: ["xz"],
  },
  {
    mimetype: "application/x-zmachine",
    source: "apache",
    extensions: ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"],
  },
  {
    mimetype: "application/x400-bp",
    source: "iana",
  },
  {
    mimetype: "application/xacml+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/xaml+xml",
    source: "apache",
    compressible: true,
    extensions: ["xaml"],
  },
  {
    mimetype: "application/xcap-att+xml",
    source: "iana",
    compressible: true,
    extensions: ["xav"],
  },
  {
    mimetype: "application/xcap-caps+xml",
    source: "iana",
    compressible: true,
    extensions: ["xca"],
  },
  {
    mimetype: "application/xcap-diff+xml",
    source: "iana",
    compressible: true,
    extensions: ["xdf"],
  },
  {
    mimetype: "application/xcap-el+xml",
    source: "iana",
    compressible: true,
    extensions: ["xel"],
  },
  {
    mimetype: "application/xcap-error+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/xcap-ns+xml",
    source: "iana",
    compressible: true,
    extensions: ["xns"],
  },
  {
    mimetype: "application/xcon-conference-info+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/xcon-conference-info-diff+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/xenc+xml",
    source: "iana",
    compressible: true,
    extensions: ["xenc"],
  },
  {
    mimetype: "application/xfdf",
    source: "iana",
    extensions: ["xfdf"],
  },
  {
    mimetype: "application/xhtml+xml",
    source: "iana",
    compressible: true,
    extensions: ["xhtml", "xht"],
  },
  {
    mimetype: "application/xhtml-voice+xml",
    source: "apache",
    compressible: true,
  },
  {
    mimetype: "application/xliff+xml",
    source: "iana",
    compressible: true,
    extensions: ["xlf"],
  },
  {
    mimetype: "application/xml",
    source: "iana",
    compressible: true,
    extensions: ["xml", "xsl", "xsd", "rng"],
  },
  {
    mimetype: "application/xml-dtd",
    source: "iana",
    compressible: true,
    extensions: ["dtd"],
  },
  {
    mimetype: "application/xml-external-parsed-entity",
    source: "iana",
  },
  {
    mimetype: "application/xml-patch+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/xmpp+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/xop+xml",
    source: "iana",
    compressible: true,
    extensions: ["xop"],
  },
  {
    mimetype: "application/xproc+xml",
    source: "apache",
    compressible: true,
    extensions: ["xpl"],
  },
  {
    mimetype: "application/xslt+xml",
    source: "iana",
    compressible: true,
    extensions: ["xsl", "xslt"],
  },
  {
    mimetype: "application/xspf+xml",
    source: "apache",
    compressible: true,
    extensions: ["xspf"],
  },
  {
    mimetype: "application/xv+xml",
    source: "iana",
    compressible: true,
    extensions: ["mxml", "xhvml", "xvml", "xvm"],
  },
  {
    mimetype: "application/yaml",
    source: "iana",
  },
  {
    mimetype: "application/yang",
    source: "iana",
    extensions: ["yang"],
  },
  {
    mimetype: "application/yang-data+cbor",
    source: "iana",
  },
  {
    mimetype: "application/yang-data+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/yang-data+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/yang-patch+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/yang-patch+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/yang-sid+json",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "application/yin+xml",
    source: "iana",
    compressible: true,
    extensions: ["yin"],
  },
  {
    mimetype: "application/zip",
    source: "iana",
    compressible: false,
    extensions: ["zip"],
  },
  {
    mimetype: "application/zlib",
    source: "iana",
  },
  {
    mimetype: "application/zstd",
    source: "iana",
  },
  {
    mimetype: "audio/1d-interleaved-parityfec",
    source: "iana",
  },
  {
    mimetype: "audio/32kadpcm",
    source: "iana",
  },
  {
    mimetype: "audio/3gpp",
    source: "iana",
    compressible: false,
    extensions: ["3gpp"],
  },
  {
    mimetype: "audio/3gpp2",
    source: "iana",
  },
  {
    mimetype: "audio/aac",
    source: "iana",
    extensions: ["adts", "aac"],
  },
  {
    mimetype: "audio/ac3",
    source: "iana",
  },
  {
    mimetype: "audio/adpcm",
    source: "apache",
    extensions: ["adp"],
  },
  {
    mimetype: "audio/amr",
    source: "iana",
    extensions: ["amr"],
  },
  {
    mimetype: "audio/amr-wb",
    source: "iana",
  },
  {
    mimetype: "audio/amr-wb+",
    source: "iana",
  },
  {
    mimetype: "audio/aptx",
    source: "iana",
  },
  {
    mimetype: "audio/asc",
    source: "iana",
  },
  {
    mimetype: "audio/atrac-advanced-lossless",
    source: "iana",
  },
  {
    mimetype: "audio/atrac-x",
    source: "iana",
  },
  {
    mimetype: "audio/atrac3",
    source: "iana",
  },
  {
    mimetype: "audio/basic",
    source: "iana",
    compressible: false,
    extensions: ["au", "snd"],
  },
  {
    mimetype: "audio/bv16",
    source: "iana",
  },
  {
    mimetype: "audio/bv32",
    source: "iana",
  },
  {
    mimetype: "audio/clearmode",
    source: "iana",
  },
  {
    mimetype: "audio/cn",
    source: "iana",
  },
  {
    mimetype: "audio/dat12",
    source: "iana",
  },
  {
    mimetype: "audio/dls",
    source: "iana",
  },
  {
    mimetype: "audio/dsr-es201108",
    source: "iana",
  },
  {
    mimetype: "audio/dsr-es202050",
    source: "iana",
  },
  {
    mimetype: "audio/dsr-es202211",
    source: "iana",
  },
  {
    mimetype: "audio/dsr-es202212",
    source: "iana",
  },
  {
    mimetype: "audio/dv",
    source: "iana",
  },
  {
    mimetype: "audio/dvi4",
    source: "iana",
  },
  {
    mimetype: "audio/eac3",
    source: "iana",
  },
  {
    mimetype: "audio/encaprtp",
    source: "iana",
  },
  {
    mimetype: "audio/evrc",
    source: "iana",
  },
  {
    mimetype: "audio/evrc-qcp",
    source: "iana",
  },
  {
    mimetype: "audio/evrc0",
    source: "iana",
  },
  {
    mimetype: "audio/evrc1",
    source: "iana",
  },
  {
    mimetype: "audio/evrcb",
    source: "iana",
  },
  {
    mimetype: "audio/evrcb0",
    source: "iana",
  },
  {
    mimetype: "audio/evrcb1",
    source: "iana",
  },
  {
    mimetype: "audio/evrcnw",
    source: "iana",
  },
  {
    mimetype: "audio/evrcnw0",
    source: "iana",
  },
  {
    mimetype: "audio/evrcnw1",
    source: "iana",
  },
  {
    mimetype: "audio/evrcwb",
    source: "iana",
  },
  {
    mimetype: "audio/evrcwb0",
    source: "iana",
  },
  {
    mimetype: "audio/evrcwb1",
    source: "iana",
  },
  {
    mimetype: "audio/evs",
    source: "iana",
  },
  {
    mimetype: "audio/flac",
    source: "iana",
  },
  {
    mimetype: "audio/flexfec",
    source: "iana",
  },
  {
    mimetype: "audio/fwdred",
    source: "iana",
  },
  {
    mimetype: "audio/g711-0",
    source: "iana",
  },
  {
    mimetype: "audio/g719",
    source: "iana",
  },
  {
    mimetype: "audio/g722",
    source: "iana",
  },
  {
    mimetype: "audio/g7221",
    source: "iana",
  },
  {
    mimetype: "audio/g723",
    source: "iana",
  },
  {
    mimetype: "audio/g726-16",
    source: "iana",
  },
  {
    mimetype: "audio/g726-24",
    source: "iana",
  },
  {
    mimetype: "audio/g726-32",
    source: "iana",
  },
  {
    mimetype: "audio/g726-40",
    source: "iana",
  },
  {
    mimetype: "audio/g728",
    source: "iana",
  },
  {
    mimetype: "audio/g729",
    source: "iana",
  },
  {
    mimetype: "audio/g7291",
    source: "iana",
  },
  {
    mimetype: "audio/g729d",
    source: "iana",
  },
  {
    mimetype: "audio/g729e",
    source: "iana",
  },
  {
    mimetype: "audio/gsm",
    source: "iana",
  },
  {
    mimetype: "audio/gsm-efr",
    source: "iana",
  },
  {
    mimetype: "audio/gsm-hr-08",
    source: "iana",
  },
  {
    mimetype: "audio/ilbc",
    source: "iana",
  },
  {
    mimetype: "audio/ip-mr_v2.5",
    source: "iana",
  },
  {
    mimetype: "audio/isac",
    source: "apache",
  },
  {
    mimetype: "audio/l16",
    source: "iana",
  },
  {
    mimetype: "audio/l20",
    source: "iana",
  },
  {
    mimetype: "audio/l24",
    source: "iana",
    compressible: false,
  },
  {
    mimetype: "audio/l8",
    source: "iana",
  },
  {
    mimetype: "audio/lpc",
    source: "iana",
  },
  {
    mimetype: "audio/matroska",
    source: "iana",
  },
  {
    mimetype: "audio/melp",
    source: "iana",
  },
  {
    mimetype: "audio/melp1200",
    source: "iana",
  },
  {
    mimetype: "audio/melp2400",
    source: "iana",
  },
  {
    mimetype: "audio/melp600",
    source: "iana",
  },
  {
    mimetype: "audio/mhas",
    source: "iana",
  },
  {
    mimetype: "audio/midi",
    source: "apache",
    extensions: ["mid", "midi", "kar", "rmi"],
  },
  {
    mimetype: "audio/midi-clip",
    source: "iana",
  },
  {
    mimetype: "audio/mobile-xmf",
    source: "iana",
    extensions: ["mxmf"],
  },
  {
    mimetype: "audio/mp3",
    compressible: false,
    extensions: ["mp3"],
  },
  {
    mimetype: "audio/mp4",
    source: "iana",
    compressible: false,
    extensions: ["m4a", "mp4a"],
  },
  {
    mimetype: "audio/mp4a-latm",
    source: "iana",
  },
  {
    mimetype: "audio/mpa",
    source: "iana",
  },
  {
    mimetype: "audio/mpa-robust",
    source: "iana",
  },
  {
    mimetype: "audio/mpeg",
    source: "iana",
    compressible: false,
    extensions: ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"],
  },
  {
    mimetype: "audio/mpeg4-generic",
    source: "iana",
  },
  {
    mimetype: "audio/musepack",
    source: "apache",
  },
  {
    mimetype: "audio/ogg",
    source: "iana",
    compressible: false,
    extensions: ["oga", "ogg", "spx", "opus"],
  },
  {
    mimetype: "audio/opus",
    source: "iana",
  },
  {
    mimetype: "audio/parityfec",
    source: "iana",
  },
  {
    mimetype: "audio/pcma",
    source: "iana",
  },
  {
    mimetype: "audio/pcma-wb",
    source: "iana",
  },
  {
    mimetype: "audio/pcmu",
    source: "iana",
  },
  {
    mimetype: "audio/pcmu-wb",
    source: "iana",
  },
  {
    mimetype: "audio/prs.sid",
    source: "iana",
  },
  {
    mimetype: "audio/qcelp",
    source: "iana",
  },
  {
    mimetype: "audio/raptorfec",
    source: "iana",
  },
  {
    mimetype: "audio/red",
    source: "iana",
  },
  {
    mimetype: "audio/rtp-enc-aescm128",
    source: "iana",
  },
  {
    mimetype: "audio/rtp-midi",
    source: "iana",
  },
  {
    mimetype: "audio/rtploopback",
    source: "iana",
  },
  {
    mimetype: "audio/rtx",
    source: "iana",
  },
  {
    mimetype: "audio/s3m",
    source: "apache",
    extensions: ["s3m"],
  },
  {
    mimetype: "audio/scip",
    source: "iana",
  },
  {
    mimetype: "audio/silk",
    source: "apache",
    extensions: ["sil"],
  },
  {
    mimetype: "audio/smv",
    source: "iana",
  },
  {
    mimetype: "audio/smv-qcp",
    source: "iana",
  },
  {
    mimetype: "audio/smv0",
    source: "iana",
  },
  {
    mimetype: "audio/sofa",
    source: "iana",
  },
  {
    mimetype: "audio/sp-midi",
    source: "iana",
  },
  {
    mimetype: "audio/speex",
    source: "iana",
  },
  {
    mimetype: "audio/t140c",
    source: "iana",
  },
  {
    mimetype: "audio/t38",
    source: "iana",
  },
  {
    mimetype: "audio/telephone-event",
    source: "iana",
  },
  {
    mimetype: "audio/tetra_acelp",
    source: "iana",
  },
  {
    mimetype: "audio/tetra_acelp_bb",
    source: "iana",
  },
  {
    mimetype: "audio/tone",
    source: "iana",
  },
  {
    mimetype: "audio/tsvcis",
    source: "iana",
  },
  {
    mimetype: "audio/uemclip",
    source: "iana",
  },
  {
    mimetype: "audio/ulpfec",
    source: "iana",
  },
  {
    mimetype: "audio/usac",
    source: "iana",
  },
  {
    mimetype: "audio/vdvi",
    source: "iana",
  },
  {
    mimetype: "audio/vmr-wb",
    source: "iana",
  },
  {
    mimetype: "audio/vnd.3gpp.iufp",
    source: "iana",
  },
  {
    mimetype: "audio/vnd.4sb",
    source: "iana",
  },
  {
    mimetype: "audio/vnd.audiokoz",
    source: "iana",
  },
  {
    mimetype: "audio/vnd.celp",
    source: "iana",
  },
  {
    mimetype: "audio/vnd.cisco.nse",
    source: "iana",
  },
  {
    mimetype: "audio/vnd.cmles.radio-events",
    source: "iana",
  },
  {
    mimetype: "audio/vnd.cns.anp1",
    source: "iana",
  },
  {
    mimetype: "audio/vnd.cns.inf1",
    source: "iana",
  },
  {
    mimetype: "audio/vnd.dece.audio",
    source: "iana",
    extensions: ["uva", "uvva"],
  },
  {
    mimetype: "audio/vnd.digital-winds",
    source: "iana",
    extensions: ["eol"],
  },
  {
    mimetype: "audio/vnd.dlna.adts",
    source: "iana",
  },
  {
    mimetype: "audio/vnd.dolby.heaac.1",
    source: "iana",
  },
  {
    mimetype: "audio/vnd.dolby.heaac.2",
    source: "iana",
  },
  {
    mimetype: "audio/vnd.dolby.mlp",
    source: "iana",
  },
  {
    mimetype: "audio/vnd.dolby.mps",
    source: "iana",
  },
  {
    mimetype: "audio/vnd.dolby.pl2",
    source: "iana",
  },
  {
    mimetype: "audio/vnd.dolby.pl2x",
    source: "iana",
  },
  {
    mimetype: "audio/vnd.dolby.pl2z",
    source: "iana",
  },
  {
    mimetype: "audio/vnd.dolby.pulse.1",
    source: "iana",
  },
  {
    mimetype: "audio/vnd.dra",
    source: "iana",
    extensions: ["dra"],
  },
  {
    mimetype: "audio/vnd.dts",
    source: "iana",
    extensions: ["dts"],
  },
  {
    mimetype: "audio/vnd.dts.hd",
    source: "iana",
    extensions: ["dtshd"],
  },
  {
    mimetype: "audio/vnd.dts.uhd",
    source: "iana",
  },
  {
    mimetype: "audio/vnd.dvb.file",
    source: "iana",
  },
  {
    mimetype: "audio/vnd.everad.plj",
    source: "iana",
  },
  {
    mimetype: "audio/vnd.hns.audio",
    source: "iana",
  },
  {
    mimetype: "audio/vnd.lucent.voice",
    source: "iana",
    extensions: ["lvp"],
  },
  {
    mimetype: "audio/vnd.ms-playready.media.pya",
    source: "iana",
    extensions: ["pya"],
  },
  {
    mimetype: "audio/vnd.nokia.mobile-xmf",
    source: "iana",
  },
  {
    mimetype: "audio/vnd.nortel.vbk",
    source: "iana",
  },
  {
    mimetype: "audio/vnd.nuera.ecelp4800",
    source: "iana",
    extensions: ["ecelp4800"],
  },
  {
    mimetype: "audio/vnd.nuera.ecelp7470",
    source: "iana",
    extensions: ["ecelp7470"],
  },
  {
    mimetype: "audio/vnd.nuera.ecelp9600",
    source: "iana",
    extensions: ["ecelp9600"],
  },
  {
    mimetype: "audio/vnd.octel.sbc",
    source: "iana",
  },
  {
    mimetype: "audio/vnd.presonus.multitrack",
    source: "iana",
  },
  {
    mimetype: "audio/vnd.qcelp",
    source: "apache",
  },
  {
    mimetype: "audio/vnd.rhetorex.32kadpcm",
    source: "iana",
  },
  {
    mimetype: "audio/vnd.rip",
    source: "iana",
    extensions: ["rip"],
  },
  {
    mimetype: "audio/vnd.rn-realaudio",
    compressible: false,
  },
  {
    mimetype: "audio/vnd.sealedmedia.softseal.mpeg",
    source: "iana",
  },
  {
    mimetype: "audio/vnd.vmx.cvsd",
    source: "iana",
  },
  {
    mimetype: "audio/vnd.wave",
    compressible: false,
  },
  {
    mimetype: "audio/vorbis",
    source: "iana",
    compressible: false,
  },
  {
    mimetype: "audio/vorbis-config",
    source: "iana",
  },
  {
    mimetype: "audio/wav",
    compressible: false,
    extensions: ["wav"],
  },
  {
    mimetype: "audio/wave",
    compressible: false,
    extensions: ["wav"],
  },
  {
    mimetype: "audio/webm",
    source: "apache",
    compressible: false,
    extensions: ["weba"],
  },
  {
    mimetype: "audio/x-aac",
    source: "apache",
    compressible: false,
    extensions: ["aac"],
  },
  {
    mimetype: "audio/x-aiff",
    source: "apache",
    extensions: ["aif", "aiff", "aifc"],
  },
  {
    mimetype: "audio/x-caf",
    source: "apache",
    compressible: false,
    extensions: ["caf"],
  },
  {
    mimetype: "audio/x-flac",
    source: "apache",
    extensions: ["flac"],
  },
  {
    mimetype: "audio/x-m4a",
    source: "nginx",
    extensions: ["m4a"],
  },
  {
    mimetype: "audio/x-matroska",
    source: "apache",
    extensions: ["mka"],
  },
  {
    mimetype: "audio/x-mpegurl",
    source: "apache",
    extensions: ["m3u"],
  },
  {
    mimetype: "audio/x-ms-wax",
    source: "apache",
    extensions: ["wax"],
  },
  {
    mimetype: "audio/x-ms-wma",
    source: "apache",
    extensions: ["wma"],
  },
  {
    mimetype: "audio/x-pn-realaudio",
    source: "apache",
    extensions: ["ram", "ra"],
  },
  {
    mimetype: "audio/x-pn-realaudio-plugin",
    source: "apache",
    extensions: ["rmp"],
  },
  {
    mimetype: "audio/x-realaudio",
    source: "nginx",
    extensions: ["ra"],
  },
  {
    mimetype: "audio/x-tta",
    source: "apache",
  },
  {
    mimetype: "audio/x-wav",
    source: "apache",
    extensions: ["wav"],
  },
  {
    mimetype: "audio/xm",
    source: "apache",
    extensions: ["xm"],
  },
  {
    mimetype: "chemical/x-cdx",
    source: "apache",
    extensions: ["cdx"],
  },
  {
    mimetype: "chemical/x-cif",
    source: "apache",
    extensions: ["cif"],
  },
  {
    mimetype: "chemical/x-cmdf",
    source: "apache",
    extensions: ["cmdf"],
  },
  {
    mimetype: "chemical/x-cml",
    source: "apache",
    extensions: ["cml"],
  },
  {
    mimetype: "chemical/x-csml",
    source: "apache",
    extensions: ["csml"],
  },
  {
    mimetype: "chemical/x-pdb",
    source: "apache",
  },
  {
    mimetype: "chemical/x-xyz",
    source: "apache",
    extensions: ["xyz"],
  },
  {
    mimetype: "font/collection",
    source: "iana",
    extensions: ["ttc"],
  },
  {
    mimetype: "font/otf",
    source: "iana",
    compressible: true,
    extensions: ["otf"],
  },
  {
    mimetype: "font/sfnt",
    source: "iana",
  },
  {
    mimetype: "font/ttf",
    source: "iana",
    compressible: true,
    extensions: ["ttf"],
  },
  {
    mimetype: "font/woff",
    source: "iana",
    extensions: ["woff"],
  },
  {
    mimetype: "font/woff2",
    source: "iana",
    extensions: ["woff2"],
  },
  {
    mimetype: "image/aces",
    source: "iana",
    extensions: ["exr"],
  },
  {
    mimetype: "image/apng",
    source: "iana",
    compressible: false,
    extensions: ["apng"],
  },
  {
    mimetype: "image/avci",
    source: "iana",
    extensions: ["avci"],
  },
  {
    mimetype: "image/avcs",
    source: "iana",
    extensions: ["avcs"],
  },
  {
    mimetype: "image/avif",
    source: "iana",
    compressible: false,
    extensions: ["avif"],
  },
  {
    mimetype: "image/bmp",
    source: "iana",
    compressible: true,
    extensions: ["bmp", "dib"],
  },
  {
    mimetype: "image/cgm",
    source: "iana",
    extensions: ["cgm"],
  },
  {
    mimetype: "image/dicom-rle",
    source: "iana",
    extensions: ["drle"],
  },
  {
    mimetype: "image/dpx",
    source: "iana",
    extensions: ["dpx"],
  },
  {
    mimetype: "image/emf",
    source: "iana",
    extensions: ["emf"],
  },
  {
    mimetype: "image/fits",
    source: "iana",
    extensions: ["fits"],
  },
  {
    mimetype: "image/g3fax",
    source: "iana",
    extensions: ["g3"],
  },
  {
    mimetype: "image/gif",
    source: "iana",
    compressible: false,
    extensions: ["gif"],
  },
  {
    mimetype: "image/heic",
    source: "iana",
    extensions: ["heic"],
  },
  {
    mimetype: "image/heic-sequence",
    source: "iana",
    extensions: ["heics"],
  },
  {
    mimetype: "image/heif",
    source: "iana",
    extensions: ["heif"],
  },
  {
    mimetype: "image/heif-sequence",
    source: "iana",
    extensions: ["heifs"],
  },
  {
    mimetype: "image/hej2k",
    source: "iana",
    extensions: ["hej2"],
  },
  {
    mimetype: "image/hsj2",
    source: "iana",
    extensions: ["hsj2"],
  },
  {
    mimetype: "image/ief",
    source: "iana",
    extensions: ["ief"],
  },
  {
    mimetype: "image/j2c",
    source: "iana",
  },
  {
    mimetype: "image/jls",
    source: "iana",
    extensions: ["jls"],
  },
  {
    mimetype: "image/jp2",
    source: "iana",
    compressible: false,
    extensions: ["jp2", "jpg2"],
  },
  {
    mimetype: "image/jpeg",
    source: "iana",
    compressible: false,
    extensions: ["jpeg", "jpg", "jpe"],
  },
  {
    mimetype: "image/jph",
    source: "iana",
    extensions: ["jph"],
  },
  {
    mimetype: "image/jphc",
    source: "iana",
    extensions: ["jhc"],
  },
  {
    mimetype: "image/jpm",
    source: "iana",
    compressible: false,
    extensions: ["jpm", "jpgm"],
  },
  {
    mimetype: "image/jpx",
    source: "iana",
    compressible: false,
    extensions: ["jpx", "jpf"],
  },
  {
    mimetype: "image/jxl",
    source: "iana",
    extensions: ["jxl"],
  },
  {
    mimetype: "image/jxr",
    source: "iana",
    extensions: ["jxr"],
  },
  {
    mimetype: "image/jxra",
    source: "iana",
    extensions: ["jxra"],
  },
  {
    mimetype: "image/jxrs",
    source: "iana",
    extensions: ["jxrs"],
  },
  {
    mimetype: "image/jxs",
    source: "iana",
    extensions: ["jxs"],
  },
  {
    mimetype: "image/jxsc",
    source: "iana",
    extensions: ["jxsc"],
  },
  {
    mimetype: "image/jxsi",
    source: "iana",
    extensions: ["jxsi"],
  },
  {
    mimetype: "image/jxss",
    source: "iana",
    extensions: ["jxss"],
  },
  {
    mimetype: "image/ktx",
    source: "iana",
    extensions: ["ktx"],
  },
  {
    mimetype: "image/ktx2",
    source: "iana",
    extensions: ["ktx2"],
  },
  {
    mimetype: "image/naplps",
    source: "iana",
  },
  {
    mimetype: "image/pjpeg",
    compressible: false,
  },
  {
    mimetype: "image/png",
    source: "iana",
    compressible: false,
    extensions: ["png"],
  },
  {
    mimetype: "image/prs.btif",
    source: "iana",
    extensions: ["btif", "btf"],
  },
  {
    mimetype: "image/prs.pti",
    source: "iana",
    extensions: ["pti"],
  },
  {
    mimetype: "image/pwg-raster",
    source: "iana",
  },
  {
    mimetype: "image/sgi",
    source: "apache",
    extensions: ["sgi"],
  },
  {
    mimetype: "image/svg+xml",
    source: "iana",
    compressible: true,
    extensions: ["svg", "svgz"],
  },
  {
    mimetype: "image/t38",
    source: "iana",
    extensions: ["t38"],
  },
  {
    mimetype: "image/tiff",
    source: "iana",
    compressible: false,
    extensions: ["tif", "tiff"],
  },
  {
    mimetype: "image/tiff-fx",
    source: "iana",
    extensions: ["tfx"],
  },
  {
    mimetype: "image/vnd.adobe.photoshop",
    source: "iana",
    compressible: true,
    extensions: ["psd"],
  },
  {
    mimetype: "image/vnd.airzip.accelerator.azv",
    source: "iana",
    extensions: ["azv"],
  },
  {
    mimetype: "image/vnd.cns.inf2",
    source: "iana",
  },
  {
    mimetype: "image/vnd.dece.graphic",
    source: "iana",
    extensions: ["uvi", "uvvi", "uvg", "uvvg"],
  },
  {
    mimetype: "image/vnd.djvu",
    source: "iana",
    extensions: ["djvu", "djv"],
  },
  {
    mimetype: "image/vnd.dvb.subtitle",
    source: "iana",
    extensions: ["sub"],
  },
  {
    mimetype: "image/vnd.dwg",
    source: "iana",
    extensions: ["dwg"],
  },
  {
    mimetype: "image/vnd.dxf",
    source: "iana",
    extensions: ["dxf"],
  },
  {
    mimetype: "image/vnd.fastbidsheet",
    source: "iana",
    extensions: ["fbs"],
  },
  {
    mimetype: "image/vnd.fpx",
    source: "iana",
    extensions: ["fpx"],
  },
  {
    mimetype: "image/vnd.fst",
    source: "iana",
    extensions: ["fst"],
  },
  {
    mimetype: "image/vnd.fujixerox.edmics-mmr",
    source: "iana",
    extensions: ["mmr"],
  },
  {
    mimetype: "image/vnd.fujixerox.edmics-rlc",
    source: "iana",
    extensions: ["rlc"],
  },
  {
    mimetype: "image/vnd.globalgraphics.pgb",
    source: "iana",
  },
  {
    mimetype: "image/vnd.microsoft.icon",
    source: "iana",
    compressible: true,
    extensions: ["ico"],
  },
  {
    mimetype: "image/vnd.mix",
    source: "iana",
  },
  {
    mimetype: "image/vnd.mozilla.apng",
    source: "iana",
  },
  {
    mimetype: "image/vnd.ms-dds",
    compressible: true,
    extensions: ["dds"],
  },
  {
    mimetype: "image/vnd.ms-modi",
    source: "iana",
    extensions: ["mdi"],
  },
  {
    mimetype: "image/vnd.ms-photo",
    source: "apache",
    extensions: ["wdp"],
  },
  {
    mimetype: "image/vnd.net-fpx",
    source: "iana",
    extensions: ["npx"],
  },
  {
    mimetype: "image/vnd.pco.b16",
    source: "iana",
    extensions: ["b16"],
  },
  {
    mimetype: "image/vnd.radiance",
    source: "iana",
  },
  {
    mimetype: "image/vnd.sealed.png",
    source: "iana",
  },
  {
    mimetype: "image/vnd.sealedmedia.softseal.gif",
    source: "iana",
  },
  {
    mimetype: "image/vnd.sealedmedia.softseal.jpg",
    source: "iana",
  },
  {
    mimetype: "image/vnd.svf",
    source: "iana",
  },
  {
    mimetype: "image/vnd.tencent.tap",
    source: "iana",
    extensions: ["tap"],
  },
  {
    mimetype: "image/vnd.valve.source.texture",
    source: "iana",
    extensions: ["vtf"],
  },
  {
    mimetype: "image/vnd.wap.wbmp",
    source: "iana",
    extensions: ["wbmp"],
  },
  {
    mimetype: "image/vnd.xiff",
    source: "iana",
    extensions: ["xif"],
  },
  {
    mimetype: "image/vnd.zbrush.pcx",
    source: "iana",
    extensions: ["pcx"],
  },
  {
    mimetype: "image/webp",
    source: "iana",
    extensions: ["webp"],
  },
  {
    mimetype: "image/wmf",
    source: "iana",
    extensions: ["wmf"],
  },
  {
    mimetype: "image/x-3ds",
    source: "apache",
    extensions: ["3ds"],
  },
  {
    mimetype: "image/x-cmu-raster",
    source: "apache",
    extensions: ["ras"],
  },
  {
    mimetype: "image/x-cmx",
    source: "apache",
    extensions: ["cmx"],
  },
  {
    mimetype: "image/x-freehand",
    source: "apache",
    extensions: ["fh", "fhc", "fh4", "fh5", "fh7"],
  },
  {
    mimetype: "image/x-icon",
    source: "apache",
    compressible: true,
    extensions: ["ico"],
  },
  {
    mimetype: "image/x-jng",
    source: "nginx",
    extensions: ["jng"],
  },
  {
    mimetype: "image/x-mrsid-image",
    source: "apache",
    extensions: ["sid"],
  },
  {
    mimetype: "image/x-ms-bmp",
    source: "nginx",
    compressible: true,
    extensions: ["bmp"],
  },
  {
    mimetype: "image/x-pcx",
    source: "apache",
    extensions: ["pcx"],
  },
  {
    mimetype: "image/x-pict",
    source: "apache",
    extensions: ["pic", "pct"],
  },
  {
    mimetype: "image/x-portable-anymap",
    source: "apache",
    extensions: ["pnm"],
  },
  {
    mimetype: "image/x-portable-bitmap",
    source: "apache",
    extensions: ["pbm"],
  },
  {
    mimetype: "image/x-portable-graymap",
    source: "apache",
    extensions: ["pgm"],
  },
  {
    mimetype: "image/x-portable-pixmap",
    source: "apache",
    extensions: ["ppm"],
  },
  {
    mimetype: "image/x-rgb",
    source: "apache",
    extensions: ["rgb"],
  },
  {
    mimetype: "image/x-tga",
    source: "apache",
    extensions: ["tga"],
  },
  {
    mimetype: "image/x-xbitmap",
    source: "apache",
    extensions: ["xbm"],
  },
  {
    mimetype: "image/x-xcf",
    compressible: false,
  },
  {
    mimetype: "image/x-xpixmap",
    source: "apache",
    extensions: ["xpm"],
  },
  {
    mimetype: "image/x-xwindowdump",
    source: "apache",
    extensions: ["xwd"],
  },
  {
    mimetype: "message/bhttp",
    source: "iana",
  },
  {
    mimetype: "message/cpim",
    source: "iana",
  },
  {
    mimetype: "message/delivery-status",
    source: "iana",
  },
  {
    mimetype: "message/disposition-notification",
    source: "iana",
    extensions: ["disposition-notification"],
  },
  {
    mimetype: "message/external-body",
    source: "iana",
  },
  {
    mimetype: "message/feedback-report",
    source: "iana",
  },
  {
    mimetype: "message/global",
    source: "iana",
    extensions: ["u8msg"],
  },
  {
    mimetype: "message/global-delivery-status",
    source: "iana",
    extensions: ["u8dsn"],
  },
  {
    mimetype: "message/global-disposition-notification",
    source: "iana",
    extensions: ["u8mdn"],
  },
  {
    mimetype: "message/global-headers",
    source: "iana",
    extensions: ["u8hdr"],
  },
  {
    mimetype: "message/http",
    source: "iana",
    compressible: false,
  },
  {
    mimetype: "message/imdn+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "message/mls",
    source: "iana",
  },
  {
    mimetype: "message/news",
    source: "apache",
  },
  {
    mimetype: "message/ohttp-req",
    source: "iana",
  },
  {
    mimetype: "message/ohttp-res",
    source: "iana",
  },
  {
    mimetype: "message/partial",
    source: "iana",
    compressible: false,
  },
  {
    mimetype: "message/rfc822",
    source: "iana",
    compressible: true,
    extensions: ["eml", "mime"],
  },
  {
    mimetype: "message/s-http",
    source: "apache",
  },
  {
    mimetype: "message/sip",
    source: "iana",
  },
  {
    mimetype: "message/sipfrag",
    source: "iana",
  },
  {
    mimetype: "message/tracking-status",
    source: "iana",
  },
  {
    mimetype: "message/vnd.si.simp",
    source: "apache",
  },
  {
    mimetype: "message/vnd.wfa.wsc",
    source: "iana",
    extensions: ["wsc"],
  },
  {
    mimetype: "model/3mf",
    source: "iana",
    extensions: ["3mf"],
  },
  {
    mimetype: "model/e57",
    source: "iana",
  },
  {
    mimetype: "model/gltf+json",
    source: "iana",
    compressible: true,
    extensions: ["gltf"],
  },
  {
    mimetype: "model/gltf-binary",
    source: "iana",
    compressible: true,
    extensions: ["glb"],
  },
  {
    mimetype: "model/iges",
    source: "iana",
    compressible: false,
    extensions: ["igs", "iges"],
  },
  {
    mimetype: "model/jt",
    source: "iana",
    extensions: ["jt"],
  },
  {
    mimetype: "model/mesh",
    source: "iana",
    compressible: false,
    extensions: ["msh", "mesh", "silo"],
  },
  {
    mimetype: "model/mtl",
    source: "iana",
    extensions: ["mtl"],
  },
  {
    mimetype: "model/obj",
    source: "iana",
    extensions: ["obj"],
  },
  {
    mimetype: "model/prc",
    source: "iana",
    extensions: ["prc"],
  },
  {
    mimetype: "model/step",
    source: "iana",
  },
  {
    mimetype: "model/step+xml",
    source: "iana",
    compressible: true,
    extensions: ["stpx"],
  },
  {
    mimetype: "model/step+zip",
    source: "iana",
    compressible: false,
    extensions: ["stpz"],
  },
  {
    mimetype: "model/step-xml+zip",
    source: "iana",
    compressible: false,
    extensions: ["stpxz"],
  },
  {
    mimetype: "model/stl",
    source: "iana",
    extensions: ["stl"],
  },
  {
    mimetype: "model/u3d",
    source: "iana",
    extensions: ["u3d"],
  },
  {
    mimetype: "model/vnd.bary",
    source: "iana",
    extensions: ["bary"],
  },
  {
    mimetype: "model/vnd.cld",
    source: "iana",
    extensions: ["cld"],
  },
  {
    mimetype: "model/vnd.collada+xml",
    source: "iana",
    compressible: true,
    extensions: ["dae"],
  },
  {
    mimetype: "model/vnd.dwf",
    source: "iana",
    extensions: ["dwf"],
  },
  {
    mimetype: "model/vnd.flatland.3dml",
    source: "iana",
  },
  {
    mimetype: "model/vnd.gdl",
    source: "iana",
    extensions: ["gdl"],
  },
  {
    mimetype: "model/vnd.gs-gdl",
    source: "apache",
  },
  {
    mimetype: "model/vnd.gs.gdl",
    source: "iana",
  },
  {
    mimetype: "model/vnd.gtw",
    source: "iana",
    extensions: ["gtw"],
  },
  {
    mimetype: "model/vnd.moml+xml",
    source: "iana",
    compressible: true,
  },
  {
    mimetype: "model/vnd.mts",
    source: "iana",
    extensions: ["mts"],
  },
  {
    mimetype: "model/vnd.opengex",
    source: "iana",
    extensions: ["ogex"],
  },
  {
    mimetype: "model/vnd.parasolid.transmit.binary",
    source: "iana",
    extensions: ["x_b"],
  },
  {
    mimetype: "model/vnd.parasolid.transmit.text",
    source: "iana",
    extensions: ["x_t"],
  },
  {
    mimetype: "model/vnd.pytha.pyox",
    source: "iana",
    extensions: ["pyo", "pyox"],
  },
  {
    mimetype: "model/vnd.rosette.annotated-data-model",
    source: "iana",
  },
  {
    mimetype: "model/vnd.sap.vds",
    source: "iana",
    extensions: ["vds"],
  },
  {
    mimetype: "model/vnd.usda",
    source: "iana",
    extensions: ["usda"],
  },
  {
    mimetype: "model/vnd.usdz+zip",
    source: "iana",
    compressible: false,
    extensions: ["usdz"],
  },
  {
    mimetype: "model/vnd.valve.source.compiled-map",
    source: "iana",
    extensions: ["bsp"],
  },
  {
    mimetype: "model/vnd.vtu",
    source: "iana",
    extensions: ["vtu"],
  },
  {
    mimetype: "model/vrml",
    source: "iana",
    compressible: false,
    extensions: ["wrl", "vrml"],
  },
  {
    mimetype: "model/x3d+binary",
    source: "apache",
    compressible: false,
    extensions: ["x3db", "x3dbz"],
  },
  {
    mimetype: "model/x3d+fastinfoset",
    source: "iana",
    extensions: ["x3db"],
  },
  {
    mimetype: "model/x3d+vrml",
    source: "apache",
    compressible: false,
    extensions: ["x3dv", "x3dvz"],
  },
  {
    mimetype: "model/x3d+xml",
    source: "iana",
    compressible: true,
    extensions: ["x3d", "x3dz"],
  },
  {
    mimetype: "model/x3d-vrml",
    source: "iana",
    extensions: ["x3dv"],
  },
  {
    mimetype: "multipart/alternative",
    source: "iana",
    compressible: false,
  },
  {
    mimetype: "multipart/appledouble",
    source: "iana",
  },
  {
    mimetype: "multipart/byteranges",
    source: "iana",
  },
  {
    mimetype: "multipart/digest",
    source: "iana",
  },
  {
    mimetype: "multipart/encrypted",
    source: "iana",
    compressible: false,
  },
  {
    mimetype: "multipart/form-data",
    source: "iana",
    compressible: false,
  },
  {
    mimetype: "multipart/header-set",
    source: "iana",
  },
  {
    mimetype: "multipart/mixed",
    source: "iana",
  },
  {
    mimetype: "multipart/multilingual",
    source: "iana",
  },
  {
    mimetype: "multipart/parallel",
    source: "iana",
  },
  {
    mimetype: "multipart/related",
    source: "iana",
    compressible: false,
  },
  {
    mimetype: "multipart/report",
    source: "iana",
  },
  {
    mimetype: "multipart/signed",
    source: "iana",
    compressible: false,
  },
  {
    mimetype: "multipart/vnd.bint.med-plus",
    source: "iana",
  },
  {
    mimetype: "multipart/voice-message",
    source: "iana",
  },
  {
    mimetype: "multipart/x-mixed-replace",
    source: "iana",
  },
  {
    mimetype: "text/1d-interleaved-parityfec",
    source: "iana",
  },
  {
    mimetype: "text/cache-manifest",
    source: "iana",
    compressible: true,
    extensions: ["appcache", "manifest"],
  },
  {
    mimetype: "text/calendar",
    source: "iana",
    extensions: ["ics", "ifb"],
  },
  {
    mimetype: "text/calender",
    compressible: true,
  },
  {
    mimetype: "text/cmd",
    compressible: true,
  },
  {
    mimetype: "text/coffeescript",
    extensions: ["coffee", "litcoffee"],
  },
  {
    mimetype: "text/cql",
    source: "iana",
  },
  {
    mimetype: "text/cql-expression",
    source: "iana",
  },
  {
    mimetype: "text/cql-identifier",
    source: "iana",
  },
  {
    mimetype: "text/css",
    source: "iana",
    charset: "UTF-8",
    compressible: true,
    extensions: ["css"],
  },
  {
    mimetype: "text/csv",
    source: "iana",
    compressible: true,
    extensions: ["csv"],
  },
  {
    mimetype: "text/csv-schema",
    source: "iana",
  },
  {
    mimetype: "text/directory",
    source: "iana",
  },
  {
    mimetype: "text/dns",
    source: "iana",
  },
  {
    mimetype: "text/ecmascript",
    source: "apache",
  },
  {
    mimetype: "text/encaprtp",
    source: "iana",
  },
  {
    mimetype: "text/enriched",
    source: "iana",
  },
  {
    mimetype: "text/fhirpath",
    source: "iana",
  },
  {
    mimetype: "text/flexfec",
    source: "iana",
  },
  {
    mimetype: "text/fwdred",
    source: "iana",
  },
  {
    mimetype: "text/gff3",
    source: "iana",
  },
  {
    mimetype: "text/grammar-ref-list",
    source: "iana",
  },
  {
    mimetype: "text/hl7v2",
    source: "iana",
  },
  {
    mimetype: "text/html",
    source: "iana",
    compressible: true,
    extensions: ["html", "htm", "shtml"],
  },
  {
    mimetype: "text/jade",
    extensions: ["jade"],
  },
  {
    mimetype: "text/javascript",
    source: "iana",
    charset: "UTF-8",
    compressible: true,
    extensions: ["js", "mjs"],
  },
  {
    mimetype: "text/jcr-cnd",
    source: "iana",
  },
  {
    mimetype: "text/jsx",
    compressible: true,
    extensions: ["jsx"],
  },
  {
    mimetype: "text/less",
    compressible: true,
    extensions: ["less"],
  },
  {
    mimetype: "text/markdown",
    source: "iana",
    compressible: true,
    extensions: ["md", "markdown"],
  },
  {
    mimetype: "text/mathml",
    source: "nginx",
    extensions: ["mml"],
  },
  {
    mimetype: "text/mdx",
    compressible: true,
    extensions: ["mdx"],
  },
  {
    mimetype: "text/mizar",
    source: "iana",
  },
  {
    mimetype: "text/n3",
    source: "iana",
    charset: "UTF-8",
    compressible: true,
    extensions: ["n3"],
  },
  {
    mimetype: "text/parameters",
    source: "iana",
    charset: "UTF-8",
  },
  {
    mimetype: "text/parityfec",
    source: "iana",
  },
  {
    mimetype: "text/plain",
    source: "iana",
    compressible: true,
    extensions: ["txt", "text", "conf", "def", "list", "log", "in", "ini"],
  },
  {
    mimetype: "text/provenance-notation",
    source: "iana",
    charset: "UTF-8",
  },
  {
    mimetype: "text/prs.fallenstein.rst",
    source: "iana",
  },
  {
    mimetype: "text/prs.lines.tag",
    source: "iana",
    extensions: ["dsc"],
  },
  {
    mimetype: "text/prs.prop.logic",
    source: "iana",
  },
  {
    mimetype: "text/prs.texi",
    source: "iana",
  },
  {
    mimetype: "text/raptorfec",
    source: "iana",
  },
  {
    mimetype: "text/red",
    source: "iana",
  },
  {
    mimetype: "text/rfc822-headers",
    source: "iana",
  },
  {
    mimetype: "text/richtext",
    source: "iana",
    compressible: true,
    extensions: ["rtx"],
  },
  {
    mimetype: "text/rtf",
    source: "iana",
    compressible: true,
    extensions: ["rtf"],
  },
  {
    mimetype: "text/rtp-enc-aescm128",
    source: "iana",
  },
  {
    mimetype: "text/rtploopback",
    source: "iana",
  },
  {
    mimetype: "text/rtx",
    source: "iana",
  },
  {
    mimetype: "text/sgml",
    source: "iana",
    extensions: ["sgml", "sgm"],
  },
  {
    mimetype: "text/shaclc",
    source: "iana",
  },
  {
    mimetype: "text/shex",
    source: "iana",
    extensions: ["shex"],
  },
  {
    mimetype: "text/slim",
    extensions: ["slim", "slm"],
  },
  {
    mimetype: "text/spdx",
    source: "iana",
    extensions: ["spdx"],
  },
  {
    mimetype: "text/strings",
    source: "iana",
  },
  {
    mimetype: "text/stylus",
    extensions: ["stylus", "styl"],
  },
  {
    mimetype: "text/t140",
    source: "iana",
  },
  {
    mimetype: "text/tab-separated-values",
    source: "iana",
    compressible: true,
    extensions: ["tsv"],
  },
  {
    mimetype: "text/troff",
    source: "iana",
    extensions: ["t", "tr", "roff", "man", "me", "ms"],
  },
  {
    mimetype: "text/turtle",
    source: "iana",
    charset: "UTF-8",
    extensions: ["ttl"],
  },
  {
    mimetype: "text/ulpfec",
    source: "iana",
  },
  {
    mimetype: "text/uri-list",
    source: "iana",
    compressible: true,
    extensions: ["uri", "uris", "urls"],
  },
  {
    mimetype: "text/vcard",
    source: "iana",
    compressible: true,
    extensions: ["vcard"],
  },
  {
    mimetype: "text/vnd.a",
    source: "iana",
  },
  {
    mimetype: "text/vnd.abc",
    source: "iana",
  },
  {
    mimetype: "text/vnd.ascii-art",
    source: "iana",
  },
  {
    mimetype: "text/vnd.curl",
    source: "iana",
    extensions: ["curl"],
  },
  {
    mimetype: "text/vnd.curl.dcurl",
    source: "apache",
    extensions: ["dcurl"],
  },
  {
    mimetype: "text/vnd.curl.mcurl",
    source: "apache",
    extensions: ["mcurl"],
  },
  {
    mimetype: "text/vnd.curl.scurl",
    source: "apache",
    extensions: ["scurl"],
  },
  {
    mimetype: "text/vnd.debian.copyright",
    source: "iana",
    charset: "UTF-8",
  },
  {
    mimetype: "text/vnd.dmclientscript",
    source: "iana",
  },
  {
    mimetype: "text/vnd.dvb.subtitle",
    source: "iana",
    extensions: ["sub"],
  },
  {
    mimetype: "text/vnd.esmertec.theme-descriptor",
    source: "iana",
    charset: "UTF-8",
  },
  {
    mimetype: "text/vnd.exchangeable",
    source: "iana",
  },
  {
    mimetype: "text/vnd.familysearch.gedcom",
    source: "iana",
    extensions: ["ged"],
  },
  {
    mimetype: "text/vnd.ficlab.flt",
    source: "iana",
  },
  {
    mimetype: "text/vnd.fly",
    source: "iana",
    extensions: ["fly"],
  },
  {
    mimetype: "text/vnd.fmi.flexstor",
    source: "iana",
    extensions: ["flx"],
  },
  {
    mimetype: "text/vnd.gml",
    source: "iana",
  },
  {
    mimetype: "text/vnd.graphviz",
    source: "iana",
    extensions: ["gv"],
  },
  {
    mimetype: "text/vnd.hans",
    source: "iana",
  },
  {
    mimetype: "text/vnd.hgl",
    source: "iana",
  },
  {
    mimetype: "text/vnd.in3d.3dml",
    source: "iana",
    extensions: ["3dml"],
  },
  {
    mimetype: "text/vnd.in3d.spot",
    source: "iana",
    extensions: ["spot"],
  },
  {
    mimetype: "text/vnd.iptc.newsml",
    source: "iana",
  },
  {
    mimetype: "text/vnd.iptc.nitf",
    source: "iana",
  },
  {
    mimetype: "text/vnd.latex-z",
    source: "iana",
  },
  {
    mimetype: "text/vnd.motorola.reflex",
    source: "iana",
  },
  {
    mimetype: "text/vnd.ms-mediapackage",
    source: "iana",
  },
  {
    mimetype: "text/vnd.net2phone.commcenter.command",
    source: "iana",
  },
  {
    mimetype: "text/vnd.radisys.msml-basic-layout",
    source: "iana",
  },
  {
    mimetype: "text/vnd.senx.warpscript",
    source: "iana",
  },
  {
    mimetype: "text/vnd.si.uricatalogue",
    source: "apache",
  },
  {
    mimetype: "text/vnd.sosi",
    source: "iana",
  },
  {
    mimetype: "text/vnd.sun.j2me.app-descriptor",
    source: "iana",
    charset: "UTF-8",
    extensions: ["jad"],
  },
  {
    mimetype: "text/vnd.trolltech.linguist",
    source: "iana",
    charset: "UTF-8",
  },
  {
    mimetype: "text/vnd.vcf",
    source: "iana",
  },
  {
    mimetype: "text/vnd.wap.si",
    source: "iana",
  },
  {
    mimetype: "text/vnd.wap.sl",
    source: "iana",
  },
  {
    mimetype: "text/vnd.wap.wml",
    source: "iana",
    extensions: ["wml"],
  },
  {
    mimetype: "text/vnd.wap.wmlscript",
    source: "iana",
    extensions: ["wmls"],
  },
  {
    mimetype: "text/vnd.zoo.kcl",
    source: "iana",
  },
  {
    mimetype: "text/vtt",
    source: "iana",
    charset: "UTF-8",
    compressible: true,
    extensions: ["vtt"],
  },
  {
    mimetype: "text/wgsl",
    source: "iana",
    extensions: ["wgsl"],
  },
  {
    mimetype: "text/x-asm",
    source: "apache",
    extensions: ["s", "asm"],
  },
  {
    mimetype: "text/x-c",
    source: "apache",
    extensions: ["c", "cc", "cxx", "cpp", "h", "hh", "dic"],
  },
  {
    mimetype: "text/x-component",
    source: "nginx",
    extensions: ["htc"],
  },
  {
    mimetype: "text/x-fortran",
    source: "apache",
    extensions: ["f", "for", "f77", "f90"],
  },
  {
    mimetype: "text/x-gwt-rpc",
    compressible: true,
  },
  {
    mimetype: "text/x-handlebars-template",
    extensions: ["hbs"],
  },
  {
    mimetype: "text/x-java-source",
    source: "apache",
    extensions: ["java"],
  },
  {
    mimetype: "text/x-jquery-tmpl",
    compressible: true,
  },
  {
    mimetype: "text/x-lua",
    extensions: ["lua"],
  },
  {
    mimetype: "text/x-markdown",
    compressible: true,
    extensions: ["mkd"],
  },
  {
    mimetype: "text/x-nfo",
    source: "apache",
    extensions: ["nfo"],
  },
  {
    mimetype: "text/x-opml",
    source: "apache",
    extensions: ["opml"],
  },
  {
    mimetype: "text/x-org",
    compressible: true,
    extensions: ["org"],
  },
  {
    mimetype: "text/x-pascal",
    source: "apache",
    extensions: ["p", "pas"],
  },
  {
    mimetype: "text/x-processing",
    compressible: true,
    extensions: ["pde"],
  },
  {
    mimetype: "text/x-sass",
    extensions: ["sass"],
  },
  {
    mimetype: "text/x-scss",
    extensions: ["scss"],
  },
  {
    mimetype: "text/x-setext",
    source: "apache",
    extensions: ["etx"],
  },
  {
    mimetype: "text/x-sfv",
    source: "apache",
    extensions: ["sfv"],
  },
  {
    mimetype: "text/x-suse-ymp",
    compressible: true,
    extensions: ["ymp"],
  },
  {
    mimetype: "text/x-uuencode",
    source: "apache",
    extensions: ["uu"],
  },
  {
    mimetype: "text/x-vcalendar",
    source: "apache",
    extensions: ["vcs"],
  },
  {
    mimetype: "text/x-vcard",
    source: "apache",
    extensions: ["vcf"],
  },
  {
    mimetype: "text/xml",
    source: "iana",
    compressible: true,
    extensions: ["xml"],
  },
  {
    mimetype: "text/xml-external-parsed-entity",
    source: "iana",
  },
  {
    mimetype: "text/yaml",
    compressible: true,
    extensions: ["yaml", "yml"],
  },
  {
    mimetype: "video/1d-interleaved-parityfec",
    source: "iana",
  },
  {
    mimetype: "video/3gpp",
    source: "iana",
    extensions: ["3gp", "3gpp"],
  },
  {
    mimetype: "video/3gpp-tt",
    source: "iana",
  },
  {
    mimetype: "video/3gpp2",
    source: "iana",
    extensions: ["3g2"],
  },
  {
    mimetype: "video/av1",
    source: "iana",
  },
  {
    mimetype: "video/bmpeg",
    source: "iana",
  },
  {
    mimetype: "video/bt656",
    source: "iana",
  },
  {
    mimetype: "video/celb",
    source: "iana",
  },
  {
    mimetype: "video/dv",
    source: "iana",
  },
  {
    mimetype: "video/encaprtp",
    source: "iana",
  },
  {
    mimetype: "video/evc",
    source: "iana",
  },
  {
    mimetype: "video/ffv1",
    source: "iana",
  },
  {
    mimetype: "video/flexfec",
    source: "iana",
  },
  {
    mimetype: "video/h261",
    source: "iana",
    extensions: ["h261"],
  },
  {
    mimetype: "video/h263",
    source: "iana",
    extensions: ["h263"],
  },
  {
    mimetype: "video/h263-1998",
    source: "iana",
  },
  {
    mimetype: "video/h263-2000",
    source: "iana",
  },
  {
    mimetype: "video/h264",
    source: "iana",
    extensions: ["h264"],
  },
  {
    mimetype: "video/h264-rcdo",
    source: "iana",
  },
  {
    mimetype: "video/h264-svc",
    source: "iana",
  },
  {
    mimetype: "video/h265",
    source: "iana",
  },
  {
    mimetype: "video/h266",
    source: "iana",
  },
  {
    mimetype: "video/iso.segment",
    source: "iana",
    extensions: ["m4s"],
  },
  {
    mimetype: "video/jpeg",
    source: "iana",
    extensions: ["jpgv"],
  },
  {
    mimetype: "video/jpeg2000",
    source: "iana",
  },
  {
    mimetype: "video/jpm",
    source: "apache",
    extensions: ["jpm", "jpgm"],
  },
  {
    mimetype: "video/jxsv",
    source: "iana",
  },
  {
    mimetype: "video/matroska",
    source: "iana",
  },
  {
    mimetype: "video/matroska-3d",
    source: "iana",
  },
  {
    mimetype: "video/mj2",
    source: "iana",
    extensions: ["mj2", "mjp2"],
  },
  {
    mimetype: "video/mp1s",
    source: "iana",
  },
  {
    mimetype: "video/mp2p",
    source: "iana",
  },
  {
    mimetype: "video/mp2t",
    source: "iana",
    extensions: ["ts", "m2t", "m2ts", "mts"],
  },
  {
    mimetype: "video/mp4",
    source: "iana",
    compressible: false,
    extensions: ["mp4", "mp4v", "mpg4"],
  },
  {
    mimetype: "video/mp4v-es",
    source: "iana",
  },
  {
    mimetype: "video/mpeg",
    source: "iana",
    compressible: false,
    extensions: ["mpeg", "mpg", "mpe", "m1v", "m2v"],
  },
  {
    mimetype: "video/mpeg4-generic",
    source: "iana",
  },
  {
    mimetype: "video/mpv",
    source: "iana",
  },
  {
    mimetype: "video/nv",
    source: "iana",
  },
  {
    mimetype: "video/ogg",
    source: "iana",
    compressible: false,
    extensions: ["ogv"],
  },
  {
    mimetype: "video/parityfec",
    source: "iana",
  },
  {
    mimetype: "video/pointer",
    source: "iana",
  },
  {
    mimetype: "video/quicktime",
    source: "iana",
    compressible: false,
    extensions: ["qt", "mov"],
  },
  {
    mimetype: "video/raptorfec",
    source: "iana",
  },
  {
    mimetype: "video/raw",
    source: "iana",
  },
  {
    mimetype: "video/rtp-enc-aescm128",
    source: "iana",
  },
  {
    mimetype: "video/rtploopback",
    source: "iana",
  },
  {
    mimetype: "video/rtx",
    source: "iana",
  },
  {
    mimetype: "video/scip",
    source: "iana",
  },
  {
    mimetype: "video/smpte291",
    source: "iana",
  },
  {
    mimetype: "video/smpte292m",
    source: "iana",
  },
  {
    mimetype: "video/ulpfec",
    source: "iana",
  },
  {
    mimetype: "video/vc1",
    source: "iana",
  },
  {
    mimetype: "video/vc2",
    source: "iana",
  },
  {
    mimetype: "video/vnd.cctv",
    source: "iana",
  },
  {
    mimetype: "video/vnd.dece.hd",
    source: "iana",
    extensions: ["uvh", "uvvh"],
  },
  {
    mimetype: "video/vnd.dece.mobile",
    source: "iana",
    extensions: ["uvm", "uvvm"],
  },
  {
    mimetype: "video/vnd.dece.mp4",
    source: "iana",
  },
  {
    mimetype: "video/vnd.dece.pd",
    source: "iana",
    extensions: ["uvp", "uvvp"],
  },
  {
    mimetype: "video/vnd.dece.sd",
    source: "iana",
    extensions: ["uvs", "uvvs"],
  },
  {
    mimetype: "video/vnd.dece.video",
    source: "iana",
    extensions: ["uvv", "uvvv"],
  },
  {
    mimetype: "video/vnd.directv.mpeg",
    source: "iana",
  },
  {
    mimetype: "video/vnd.directv.mpeg-tts",
    source: "iana",
  },
  {
    mimetype: "video/vnd.dlna.mpeg-tts",
    source: "iana",
  },
  {
    mimetype: "video/vnd.dvb.file",
    source: "iana",
    extensions: ["dvb"],
  },
  {
    mimetype: "video/vnd.fvt",
    source: "iana",
    extensions: ["fvt"],
  },
  {
    mimetype: "video/vnd.hns.video",
    source: "iana",
  },
  {
    mimetype: "video/vnd.iptvforum.1dparityfec-1010",
    source: "iana",
  },
  {
    mimetype: "video/vnd.iptvforum.1dparityfec-2005",
    source: "iana",
  },
  {
    mimetype: "video/vnd.iptvforum.2dparityfec-1010",
    source: "iana",
  },
  {
    mimetype: "video/vnd.iptvforum.2dparityfec-2005",
    source: "iana",
  },
  {
    mimetype: "video/vnd.iptvforum.ttsavc",
    source: "iana",
  },
  {
    mimetype: "video/vnd.iptvforum.ttsmpeg2",
    source: "iana",
  },
  {
    mimetype: "video/vnd.motorola.video",
    source: "iana",
  },
  {
    mimetype: "video/vnd.motorola.videop",
    source: "iana",
  },
  {
    mimetype: "video/vnd.mpegurl",
    source: "iana",
    extensions: ["mxu", "m4u"],
  },
  {
    mimetype: "video/vnd.ms-playready.media.pyv",
    source: "iana",
    extensions: ["pyv"],
  },
  {
    mimetype: "video/vnd.nokia.interleaved-multimedia",
    source: "iana",
  },
  {
    mimetype: "video/vnd.nokia.mp4vr",
    source: "iana",
  },
  {
    mimetype: "video/vnd.nokia.videovoip",
    source: "iana",
  },
  {
    mimetype: "video/vnd.objectvideo",
    source: "iana",
  },
  {
    mimetype: "video/vnd.radgamettools.bink",
    source: "iana",
  },
  {
    mimetype: "video/vnd.radgamettools.smacker",
    source: "apache",
  },
  {
    mimetype: "video/vnd.sealed.mpeg1",
    source: "iana",
  },
  {
    mimetype: "video/vnd.sealed.mpeg4",
    source: "iana",
  },
  {
    mimetype: "video/vnd.sealed.swf",
    source: "iana",
  },
  {
    mimetype: "video/vnd.sealedmedia.softseal.mov",
    source: "iana",
  },
  {
    mimetype: "video/vnd.uvvu.mp4",
    source: "iana",
    extensions: ["uvu", "uvvu"],
  },
  {
    mimetype: "video/vnd.vivo",
    source: "iana",
    extensions: ["viv"],
  },
  {
    mimetype: "video/vnd.youtube.yt",
    source: "iana",
  },
  {
    mimetype: "video/vp8",
    source: "iana",
  },
  {
    mimetype: "video/vp9",
    source: "iana",
  },
  {
    mimetype: "video/webm",
    source: "apache",
    compressible: false,
    extensions: ["webm"],
  },
  {
    mimetype: "video/x-f4v",
    source: "apache",
    extensions: ["f4v"],
  },
  {
    mimetype: "video/x-fli",
    source: "apache",
    extensions: ["fli"],
  },
  {
    mimetype: "video/x-flv",
    source: "apache",
    compressible: false,
    extensions: ["flv"],
  },
  {
    mimetype: "video/x-m4v",
    source: "apache",
    extensions: ["m4v"],
  },
  {
    mimetype: "video/x-matroska",
    source: "apache",
    compressible: false,
    extensions: ["mkv", "mk3d", "mks"],
  },
  {
    mimetype: "video/x-mng",
    source: "apache",
    extensions: ["mng"],
  },
  {
    mimetype: "video/x-ms-asf",
    source: "apache",
    extensions: ["asf", "asx"],
  },
  {
    mimetype: "video/x-ms-vob",
    source: "apache",
    extensions: ["vob"],
  },
  {
    mimetype: "video/x-ms-wm",
    source: "apache",
    extensions: ["wm"],
  },
  {
    mimetype: "video/x-ms-wmv",
    source: "apache",
    compressible: false,
    extensions: ["wmv"],
  },
  {
    mimetype: "video/x-ms-wmx",
    source: "apache",
    extensions: ["wmx"],
  },
  {
    mimetype: "video/x-ms-wvx",
    source: "apache",
    extensions: ["wvx"],
  },
  {
    mimetype: "video/x-msvideo",
    source: "apache",
    extensions: ["avi"],
  },
  {
    mimetype: "video/x-sgi-movie",
    source: "apache",
    extensions: ["movie"],
  },
  {
    mimetype: "video/x-smv",
    source: "apache",
    extensions: ["smv"],
  },
  {
    mimetype: "x-conference/x-cooltalk",
    source: "apache",
    extensions: ["ice"],
  },
  {
    mimetype: "x-shader/x-fragment",
    compressible: true,
  },
  {
    mimetype: "x-shader/x-vertex",
    compressible: true,
  },
];
