var JSZip = null;
var JSZip = null;
if (typeof require === "function")
	JSZip = require("node-zip");
function xlsx(file) {
	var defaultFontName = "Calibri";
	var defaultFontSize = 11;
	var result, zip = new JSZip, zipTime, processTime, s, f, i, j, k, l, t, w, sharedStrings, styles, index, data, val, style, borders, border, borderIndex, fonts, font, fontIndex, docProps, xl, xlWorksheets, worksheet, contentTypes = [
			[], [] ], props = [], xlRels = [], worksheets = [], id, columns, cols, colWidth, cell, row, merges, merged, numFmts = [
			"General", "0", "0.00", "#,##0", "#,##0.00", , , , , "0%", "0.00%",
			"0.00E+00", "# ?/?", "# ??/??", "mm-dd-yy", "d-mmm-yy", "d-mmm",
			"mmm-yy", "h:mm AM/PM", "h:mm:ss AM/PM", "h:mm", "h:mm:ss",
			"m/d/yy h:mm", , , , , , , , , , , , , , , "#,##0 ;(#,##0)",
			"#,##0 ;[Red](#,##0)", "#,##0.00;(#,##0.00)",
			"#,##0.00;[Red](#,##0.00)", , , , , "mm:ss", "[h]:mm:ss", "mmss.0",
			"##0.0E+0", "@" ], alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	function numAlpha(i) {
		var t = Math.floor(i / 26) - 1;
		return (t > -1 ? numAlpha(t) : "") + alphabet.charAt(i % 26)
	}
	function alphaNum(s) {
		var t = 0;
		if (s.length === 2)
			t = alphaNum(s.charAt(0)) + 1;
		return t * 26 + alphabet.indexOf(s.substr(-1))
	}
	function convertDate(input) {
		return typeof input === "object" ? (input - new Date(1900, 0, 0)) / 864E5 + 1
				: new Date(+new Date(1900, 0, 0) + (input - 1) * 864E5)
	}
	function typeOf(obj) {
		return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
	}
	function getAttr(s, n) {
		s = s.substr(s.indexOf(n + '="') + n.length + 2);
		return s.substring(0, s.indexOf('"'))
	}
	function escapeXML(s) {
		return (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(
				/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;")
	}
	function unescapeXML(s) {
		return (s || "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(
				/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#x27;/g, "'")
	}
	if (typeof file === "string") {
		zipTime = Date.now();
		zip = zip.load(file, {
			base64 : true
		});
		result = {
			worksheets : [],
			zipTime : Date.now() - zipTime
		};
		processTime = Date.now();
		sharedStrings = [];
		s = zip.file("xl/sharedStrings.xml");
		if (s) {
			s = s.asText().split(/<t.*?>/g);
			i = s.length;
			while (--i)
				sharedStrings[i - 1] = unescapeXML(s[i].substring(0, s[i]
						.indexOf("</t>")))
		}
		s = zip.file("docProps/core.xml").asText();
		s = s.substr(s.indexOf("<dc:creator>") + 12);
		result.creator = s.substring(0, s.indexOf("</dc:creator>"));
		s = s.substr(s.indexOf("<cp:lastModifiedBy>") + 19);
		result.lastModifiedBy = s.substring(0, s
				.indexOf("</cp:lastModifiedBy>"));
		s = s
				.substr(s
						.indexOf('<dcterms:created xsi:type="dcterms:W3CDTF">') + 43);
		result.created = new Date(s.substring(0, s
				.indexOf("</dcterms:created>")));
		s = s
				.substr(s
						.indexOf('<dcterms:modified xsi:type="dcterms:W3CDTF">') + 44);
		result.modified = new Date(s.substring(0, s
				.indexOf("</dcterms:modified>")));
		s = zip.file("xl/workbook.xml").asText();
		index = s.indexOf('activeTab="');
		if (index > 0) {
			s = s.substr(index + 11);
			result.activeWorksheet = +s.substring(0, s.indexOf('"'))
		} else
			result.activeWorksheet = 0;
		s = s.split("<sheet ");
		i = s.length;
		while (--i) {
			id = s[i].substr(s[i].indexOf('name="') + 6);
			result.worksheets.unshift({
				name : id.substring(0, id.indexOf('"')),
				data : []
			})
		}
		styles = [];
		s = zip.file("xl/styles.xml").asText().split("<numFmt ");
		i = s.length;
		while (--i) {
			t = s[i];
			numFmts[+getAttr(t, "numFmtId")] = getAttr(t, "formatCode")
		}
		s = s[s.length - 1];
		s = s.substr(s.indexOf("cellXfs")).split("<xf ");
		i = s.length;
		while (--i) {
			id = getAttr(s[i], "numFmtId");
			f = numFmts[id];
			if (f.indexOf("m") > -1)
				t = "date";
			else if (f.indexOf("0") > -1)
				t = "number";
			else if (f === "@")
				t = "string";
			else
				t = "unknown";
			styles.unshift({
				formatCode : f,
				type : t
			})
		}
		i = result.worksheets.length;
		while (i--) {
			s = zip.file("xl/worksheets/sheet" + (i + 1) + ".xml").asText()
					.split("<row ");
			w = result.worksheets[i];
			w.table = s[0].indexOf("<tableParts ") > 0;
			t = getAttr(s[0].substr(s[0].indexOf("<dimension")), "ref");
			t = t.substr(t.indexOf(":") + 1);
			w.maxCol = alphaNum(t.match(/[a-zA-Z]*/g)[0]) + 1;
			w.maxRow = +t.match(/\d*/g).join("");
			w = w.data;
			j = s.length;
			while (--j) {
				row = w[+getAttr(s[j], "r") - 1] = [];
				columns = s[j].split("<c ");
				k = columns.length;
				while (--k) {
					cell = columns[k];
					f = styles[+getAttr(cell, "s")] || {
						type : "General",
						formatCode : "General"
					};
					t = getAttr(cell, "t") || f.type;
					val = cell.substring(cell.indexOf("<v>") + 3, cell
							.indexOf("</v>"));
					val = val ? +val : "";
					switch (t) {
					case "s":
						val = sharedStrings[val];
						break;
					case "b":
						val = val === 1;
						break;
					case "date":
						val = convertDate(val);
						break
					}
					row[alphaNum(getAttr(cell, "r").match(/[a-zA-Z]*/g)[0])] = {
						value : val,
						formatCode : f.formatCode
					}
				}
			}
		}
		result.processTime = Date.now() - processTime
	} else {
		processTime = Date.now();
		sharedStrings = [ [], 0 ];
		zip
				.folder("_rels")
				.file(
						".rels",
						'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>');
		docProps = zip.folder("docProps");
		xl = zip.folder("xl");
		xl
				.folder("theme")
				.file(
						"theme1.xml",
						'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme"><a:themeElements><a:clrScheme name="Office"><a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1><a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1><a:dk2><a:srgbClr val="1F497D"/></a:dk2><a:lt2><a:srgbClr val="EEECE1"/></a:lt2><a:accent1><a:srgbClr val="4F81BD"/></a:accent1><a:accent2><a:srgbClr val="C0504D"/></a:accent2><a:accent3><a:srgbClr val="9BBB59"/></a:accent3><a:accent4><a:srgbClr val="8064A2"/></a:accent4><a:accent5><a:srgbClr val="4BACC6"/></a:accent5><a:accent6><a:srgbClr val="F79646"/></a:accent6><a:hlink><a:srgbClr val="0000FF"/></a:hlink><a:folHlink><a:srgbClr val="800080"/></a:folHlink></a:clrScheme><a:fontScheme name="Office"><a:majorFont><a:latin typeface="Cambria"/><a:ea typeface=""/><a:cs typeface=""/><a:font script="Jpan" typeface="MS P????"/><a:font script="Hang" typeface="?? ??"/><a:font script="Hans" typeface="??"/><a:font script="Hant" typeface="????"/><a:font script="Arab" typeface="Times New Roman"/><a:font script="Hebr" typeface="Times New Roman"/><a:font script="Thai" typeface="Tahoma"/><a:font script="Ethi" typeface="Nyala"/><a:font script="Beng" typeface="Vrinda"/><a:font script="Gujr" typeface="Shruti"/><a:font script="Khmr" typeface="MoolBoran"/><a:font script="Knda" typeface="Tunga"/><a:font script="Guru" typeface="Raavi"/><a:font script="Cans" typeface="Euphemia"/><a:font script="Cher" typeface="Plantagenet Cherokee"/><a:font script="Yiii" typeface="Microsoft Yi Baiti"/><a:font script="Tibt" typeface="Microsoft Himalaya"/><a:font script="Thaa" typeface="MV Boli"/><a:font script="Deva" typeface="Mangal"/><a:font script="Telu" typeface="Gautami"/><a:font script="Taml" typeface="Latha"/><a:font script="Syrc" typeface="Estrangelo Edessa"/><a:font script="Orya" typeface="Kalinga"/><a:font script="Mlym" typeface="Kartika"/><a:font script="Laoo" typeface="DokChampa"/><a:font script="Sinh" typeface="Iskoola Pota"/><a:font script="Mong" typeface="Mongolian Baiti"/><a:font script="Viet" typeface="Times New Roman"/><a:font script="Uigh" typeface="Microsoft Uighur"/><a:font script="Geor" typeface="Sylfaen"/></a:majorFont><a:minorFont><a:latin typeface="Calibri"/><a:ea typeface=""/><a:cs typeface=""/><a:font script="Jpan" typeface="MS P????"/><a:font script="Hang" typeface="?? ??"/><a:font script="Hans" typeface="??"/><a:font script="Hant" typeface="????"/><a:font script="Arab" typeface="Arial"/><a:font script="Hebr" typeface="Arial"/><a:font script="Thai" typeface="Tahoma"/><a:font script="Ethi" typeface="Nyala"/><a:font script="Beng" typeface="Vrinda"/><a:font script="Gujr" typeface="Shruti"/><a:font script="Khmr" typeface="DaunPenh"/><a:font script="Knda" typeface="Tunga"/><a:font script="Guru" typeface="Raavi"/><a:font script="Cans" typeface="Euphemia"/><a:font script="Cher" typeface="Plantagenet Cherokee"/><a:font script="Yiii" typeface="Microsoft Yi Baiti"/><a:font script="Tibt" typeface="Microsoft Himalaya"/><a:font script="Thaa" typeface="MV Boli"/><a:font script="Deva" typeface="Mangal"/><a:font script="Telu" typeface="Gautami"/><a:font script="Taml" typeface="Latha"/><a:font script="Syrc" typeface="Estrangelo Edessa"/><a:font script="Orya" typeface="Kalinga"/><a:font script="Mlym" typeface="Kartika"/><a:font script="Laoo" typeface="DokChampa"/><a:font script="Sinh" typeface="Iskoola Pota"/><a:font script="Mong" typeface="Mongolian Baiti"/><a:font script="Viet" typeface="Arial"/><a:font script="Uigh" typeface="Microsoft Uighur"/><a:font script="Geor" typeface="Sylfaen"/></a:minorFont></a:fontScheme><a:fmtScheme name="Office"><a:fillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs><a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs></a:gsLst><a:lin ang="16200000" scaled="1"/></a:gradFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:shade val="51000"/><a:satMod val="130000"/></a:schemeClr></a:gs><a:gs pos="80000"><a:schemeClr val="phClr"><a:shade val="93000"/><a:satMod val="130000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="94000"/><a:satMod val="135000"/></a:schemeClr></a:gs></a:gsLst><a:lin ang="16200000" scaled="0"/></a:gradFill></a:fillStyleLst><a:lnStyleLst><a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"><a:shade val="95000"/><a:satMod val="105000"/></a:schemeClr></a:solidFill><a:prstDash val="solid"/></a:ln><a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln><a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln></a:lnStyleLst><a:effectStyleLst><a:effectStyle><a:effectLst><a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="38000"/></a:srgbClr></a:outerShdw></a:effectLst></a:effectStyle><a:effectStyle><a:effectLst><a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw></a:effectLst></a:effectStyle><a:effectStyle><a:effectLst><a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw></a:effectLst><a:scene3d><a:camera prst="orthographicFront"><a:rot lat="0" lon="0" rev="0"/></a:camera><a:lightRig rig="threePt" dir="t"><a:rot lat="0" lon="0" rev="1200000"/></a:lightRig></a:scene3d><a:sp3d><a:bevelT w="63500" h="25400"/></a:sp3d></a:effectStyle></a:effectStyleLst><a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="40000"/><a:satMod val="350000"/></a:schemeClr></a:gs><a:gs pos="40000"><a:schemeClr val="phClr"><a:tint val="45000"/><a:shade val="99000"/><a:satMod val="350000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="20000"/><a:satMod val="255000"/></a:schemeClr></a:gs></a:gsLst><a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path></a:gradFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="80000"/><a:satMod val="300000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="30000"/><a:satMod val="200000"/></a:schemeClr></a:gs></a:gsLst><a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path></a:gradFill></a:bgFillStyleLst></a:fmtScheme></a:themeElements><a:objectDefaults/><a:extraClrSchemeLst/></a:theme>');
		xlWorksheets = xl.folder("worksheets");
		docProps
				.file(
						"core.xml",
						'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:creator>'
								+ (file.creator || "XLSX.js")
								+ "</dc:creator><cp:lastModifiedBy>"
								+ (file.lastModifiedBy || "XLSX.js")
								+ '</cp:lastModifiedBy><dcterms:created xsi:type="dcterms:W3CDTF">'
								+ (file.created || new Date).toISOString()
								+ '</dcterms:created><dcterms:modified xsi:type="dcterms:W3CDTF">'
								+ (file.modified || new Date).toISOString()
								+ "</dcterms:modified></cp:coreProperties>");
		styles = new Array(1);
		borders = new Array(1);
		fonts = new Array(1);
		w = file.worksheets.length;
		while (w--) {
			id = w + 1;
			worksheet = file.worksheets[w];
			data = worksheet;
			s = "";
			columns = [];
			merges = [];
			i = -1;
			l = data.length;
			while (++i < l) {
				j = -1;
				k = data[i].length;
				s += '<row r="' + (i + 1) + '" x14ac:dyDescent="0.25">';
				while (++j < k) {
					cell = data[i][j];
					val = cell.hasOwnProperty("value") ? cell.value : cell;
					t = "";
					style = {
						borders : cell.borders,
						hAlign : cell.hAlign,
						vAlign : cell.vAlign,
						bold : cell.bold,
						italic : cell.italic,
						fontName : cell.fontName,
						fontSize : cell.fontSize,
						formatCode : cell.formatCode || "General"
					};
					colWidth = 0;
					if (val && typeof val === "string" && !isFinite(val)) {
						val = escapeXML(val);
						sharedStrings[1]++;
						index = sharedStrings[0].indexOf(val);
						colWidth = val.length;
						if (index < 0)
							index = sharedStrings[0].push(val) - 1;
						val = index;
						t = "s"
					} else if (typeof val === "boolean") {
						val = val ? 1 : 0;
						t = "b";
						colWidth = 1
					} else if (typeOf(val) === "date") {
						val = convertDate(val);
						style.formatCode = cell.formatCode || "mm-dd-yy";
						colWidth = val.length
					} else if (typeof val === "object")
						val = null;
					else
						colWidth = ("" + val).length;
					style = JSON.stringify(style);
					index = styles.indexOf(style);
					if (index < 0)
						style = styles.push(style) - 1;
					else
						style = index;
					if (columns[j] == null)
						columns[j] = {
							autoWidth : false,
							max : 0
						};
					if (cell.autoWidth)
						columns[j].autoWidth = true;
					if (colWidth > columns[j].max)
						columns[j].max = colWidth;
					if (cell.colSpan > 1) {
						merges.push([ numAlpha(j) + (i + 1),
								numAlpha(j + cell.colSpan - 1) + (i + 1) ]);
						merged = [ j, 0 ];
						for (var m = 0; m < cell.colSpan - 1; m++)
							merged.push(cell);
						data[i].splice.apply(data[i], merged);
						k += cell.colSpan - 1
					} else if (cell.rowSpan > 1) {
						for (var m = 1; m < cell.rowSpan; m++)
							if (data[i + m])
								data[i + m].splice(j, 0, cell);
							else {
								cell.rowSpan = m;
								break
							}
						merges.push([ numAlpha(j) + (i + 1),
								numAlpha(j) + (i + cell.rowSpan) ])
					}
					if (cell.rowSpan > 1 || cell.colSpan > 1) {
						delete cell.value;
						delete cell.rowSpan;
						delete cell.colSpan
					}
					s += '<c r="' + numAlpha(j) + (i + 1) + '"'
							+ (style ? ' s="' + style + '"' : "")
							+ (t ? ' t="' + t + '"' : "");
					if (val != null)
						s += ">"
								+ (cell.formula ? "<f>" + cell.formula + "</f>"
										: "") + "<v>" + val + "</v></c>";
					else
						s += "/>"
				}
				s += "</row>"
			}
			cols = [];
			for (i = 0; i < columns.length; i++)
				if (columns[i].autoWidth)
					cols.push('<col min="', i + 1, '" max="', i + 1,
							'" width="', columns[i].max, '" bestFit="1"/>');
			if (cols.length > 0)
				cols = [ "<cols>" ].concat(cols, [ "</cols>" ]).join("");
			s = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac">'
					+ '<dimension ref="A1:'
					+ numAlpha(data[0].length - 1)
					+ data.length
					+ '"/><sheetViews><sheetView '
					+ (w === file.activeWorksheet ? 'tabSelected="1" ' : "")
					+ ' workbookViewId="0"/></sheetViews><sheetFormatPr defaultRowHeight="15" x14ac:dyDescent="0.25"/>'
					+ cols + "<sheetData>" + s + "</sheetData>";
			if (merges.length > 0) {
				s += '<mergeCells count="' + merges.length + '">';
				for (i = 0; i < merges.length; i++)
					s += '<mergeCell ref="' + merges[i].join(":") + '"/>';
				s += "</mergeCells>"
			}
			s += '<pageMargins left="0.7" right="0.7" top="0.75" bottom="0.75" header="0.3" footer="0.3"/>';
			if (worksheet.table)
				s += '<tableParts count="1"><tablePart r:id="rId1"/></tableParts>';
			xlWorksheets.file("sheet" + id + ".xml", s + "</worksheet>");
			if (worksheet.table) {
				i = -1;
				l = data[0].length;
				t = numAlpha(data[0].length - 1) + data.length;
				s = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><table xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" id="'
						+ id
						+ '" name="Table'
						+ id
						+ '" displayName="Table'
						+ id
						+ '" ref="A1:'
						+ t
						+ '" totalsRowShown="0"><autoFilter ref="A1:'
						+ t
						+ '"/><tableColumns count="' + data[0].length + '">';
				while (++i < l)
					s += '<tableColumn id="'
							+ (i + 1)
							+ '" name="'
							+ (data[0][i].hasOwnProperty("value") ? data[0][i].value
									: data[0][i]) + '"/>';
				s += '</tableColumns><tableStyleInfo name="TableStyleMedium2" showFirstColumn="0" showLastColumn="0" showRowStripes="1" showColumnStripes="0"/></table>';
				xl.folder("tables").file("table" + id + ".xml", s);
				xlWorksheets
						.folder("_rels")
						.file(
								"sheet" + id + ".xml.rels",
								'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/table" Target="../tables/table'
										+ id + '.xml"/></Relationships>');
				contentTypes[1]
						.unshift('<Override PartName="/xl/tables/table'
								+ id
								+ '.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml"/>')
			}
			contentTypes[0]
					.unshift('<Override PartName="/xl/worksheets/sheet'
							+ id
							+ '.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>');
			props.unshift(escapeXML(worksheet.name) || "Sheet" + id);
			xlRels
					.unshift('<Relationship Id="rId'
							+ id
							+ '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet'
							+ id + '.xml"/>');
			worksheets.unshift('<sheet name="'
					+ (escapeXML(worksheet.name) || "Sheet" + id)
					+ '" sheetId="' + id + '" r:id="rId' + id + '"/>')
		}
		i = styles.length;
		t = [];
		while (--i) {
			style = JSON.parse(styles[i]);
			if (style.formatCode !== "General") {
				index = numFmts.indexOf(style.formatCode);
				if (index < 0) {
					index = 164 + t.length;
					t.push('<numFmt formatCode="' + style.formatCode
							+ '" numFmtId="' + index + '"/>')
				}
				style.formatCode = index
			} else
				style.formatCode = 0;
			borderIndex = 0;
			if (style.borders) {
				border = [ "<border>" ];
				for ( var edge in {
					left : 0,
					right : 0,
					top : 0,
					bottom : 0,
					diagonal : 0
				})
					if (style.borders[edge]) {
						var color = style.borders[edge];
						if (color.length === 6)
							color = "FF" + color;
						border.push("<", edge, ' style="thin">',
								'<color rgb="', style.borders[edge], '"/></',
								edge, ">")
					} else
						border.push("<", edge, "/>");
				border.push("</border>");
				border = border.join("");
				borderIndex = borders.indexOf(border);
				if (borderIndex < 0)
					borderIndex = borders.push(border) - 1
			}
			fontIndex = 0;
			if (style.bold || style.italic || style.fontSize || style.fontName) {
				font = [ "<font>" ];
				if (style.bold)
					font.push("<b/>");
				if (style.italic)
					font.push("<i/>");
				font
						.push('<sz val="', style.fontSize || defaultFontSize,
								'"/>');
				font.push('<color theme="1"/>');
				font.push('<name val="', style.fontName || defaultFontName,
						'"/>');
				font.push('<family val="2"/>', "</font>");
				font = font.join("");
				fontIndex = fonts.indexOf(font);
				if (fontIndex < 0)
					fontIndex = fonts.push(font) - 1
			}
			styles[i] = [ '<xf xfId="0" fillId="0" borderId="', borderIndex,
					'" fontId="', fontIndex, '" numFmtId="', style.formatCode,
					'" ',
					style.hAlign || style.vAlign ? 'applyAlignment="1" ' : " ",
					style.formatCode > 0 ? 'applyNumberFormat="1" ' : " ",
					borderIndex > 0 ? 'applyBorder="1" ' : " ",
					fontIndex > 0 ? 'applyFont="1" ' : " ", ">" ];
			if (style.hAlign || style.vAlign) {
				styles[i].push("<alignment");
				if (style.hAlign)
					styles[i].push(' horizontal="', style.hAlign, '"');
				if (style.vAlign)
					styles[i].push(' vertical="', style.vAlign, '"');
				styles[i].push("/>")
			}
			styles[i].push("</xf>");
			styles[i] = styles[i].join("")
		}
		t = t.length ? '<numFmts count="' + t.length + '">' + t.join("")
				+ "</numFmts>" : "";
		xl
				.file(
						"styles.xml",
						'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac">'
								+ t
								+ '<fonts count="'
								+ fonts.length
								+ '" x14ac:knownFonts="1"><font><sz val="'
								+ defaultFontSize
								+ '"/><color theme="1"/><name val="'
								+ defaultFontName
								+ '"/><family val="2"/>'
								+ '<scheme val="minor"/></font>'
								+ fonts.join("")
								+ '</fonts><fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>'
								+ '<borders count="'
								+ borders.length
								+ '"><border><left/><right/><top/><bottom/><diagonal/></border>'
								+ borders.join("")
								+ '</borders><cellStyleXfs count="1">'
								+ '<xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="'
								+ styles.length
								+ '"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>'
								+ styles.join("")
								+ '</cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles><dxfs count="0"/>'
								+ '<tableStyles count="0" defaultTableStyle="TableStyleMedium2" defaultPivotStyle="PivotStyleLight16"/>'
								+ '<extLst><ext uri="{EB79DEF2-80B8-43e5-95BD-54CBDDF9020C}" xmlns:x14="http://schemas.microsoft.com/office/spreadsheetml/2009/9/main">'
								+ '<x14:slicerStyles defaultSlicerStyle="SlicerStyleLight1"/></ext></extLst></styleSheet>');
		zip
				.file(
						"[Content_Types].xml",
						'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>'
								+ contentTypes[0].join("")
								+ '<Override PartName="/xl/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/><Override PartName="/xl/sharedStrings.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"/>'
								+ contentTypes[1].join("")
								+ '<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/><Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/></Types>');
		docProps
				.file(
						"app.xml",
						'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"><Application>XLSX.js</Application><DocSecurity>0</DocSecurity><ScaleCrop>false</ScaleCrop><HeadingPairs><vt:vector size="2" baseType="variant"><vt:variant><vt:lpstr>Worksheets</vt:lpstr></vt:variant><vt:variant><vt:i4>'
								+ file.worksheets.length
								+ '</vt:i4></vt:variant></vt:vector></HeadingPairs><TitlesOfParts><vt:vector size="'
								+ props.length
								+ '" baseType="lpstr"><vt:lpstr>'
								+ props.join("</vt:lpstr><vt:lpstr>")
								+ "</vt:lpstr></vt:vector></TitlesOfParts><Manager></Manager><Company>Microsoft Corporation</Company><LinksUpToDate>false</LinksUpToDate><SharedDoc>false</SharedDoc><HyperlinksChanged>false</HyperlinksChanged><AppVersion>1.0</AppVersion></Properties>");
		xl
				.folder("_rels")
				.file(
						"workbook.xml.rels",
						'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
								+ xlRels.join("")
								+ '<Relationship Id="rId'
								+ (xlRels.length + 1)
								+ '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings" Target="sharedStrings.xml"/>'
								+ '<Relationship Id="rId'
								+ (xlRels.length + 2)
								+ '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>'
								+ '<Relationship Id="rId'
								+ (xlRels.length + 3)
								+ '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="theme/theme1.xml"/></Relationships>');
		xl
				.file(
						"sharedStrings.xml",
						'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="'
								+ sharedStrings[1]
								+ '" uniqueCount="'
								+ sharedStrings[0].length
								+ '"><si><t>'
								+ sharedStrings[0].join("</t></si><si><t>")
								+ "</t></si></sst>");
		xl
				.file(
						"workbook.xml",
						'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'
								+ '<fileVersion appName="xl" lastEdited="5" lowestEdited="5" rupBuild="9303"/><workbookPr defaultThemeVersion="124226"/><bookViews><workbookView '
								+ (file.activeWorksheet ? 'activeTab="'
										+ file.activeWorksheet + '" ' : "")
								+ 'xWindow="480" yWindow="60" windowWidth="18195" windowHeight="8505"/></bookViews><sheets>'
								+ worksheets.join("")
								+ '</sheets><calcPr calcId="145621"/></workbook>');
		processTime = Date.now() - processTime;
		zipTime = Date.now();
		result = {
			base64 : zip.generate({
				compression : "DEFLATE"
			}),
			zipTime : Date.now() - zipTime,
			processTime : processTime,
			href : function() {
				return "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,"
						+ this.base64
			}
		}
	}
	return result
}
if (typeof exports === "object" && typeof module === "object")
	module.exports = xlsx;
var JSZip = function(data, options) {
	this.files = {};
	this.root = "";
	if (data)
		this.load(data, options)
};
JSZip.signature = {
	LOCAL_FILE_HEADER : "PK\u0003\u0004",
	CENTRAL_FILE_HEADER : "PK\u0001\u0002",
	CENTRAL_DIRECTORY_END : "PK\u0005\u0006",
	ZIP64_CENTRAL_DIRECTORY_LOCATOR : "PK\u0006\u0007",
	ZIP64_CENTRAL_DIRECTORY_END : "PK\u0006\u0006",
	DATA_DESCRIPTOR : "PK\u0007\b"
};
JSZip.defaults = {
	base64 : false,
	binary : false,
	dir : false,
	date : null,
	compression : null
};
JSZip.prototype = function() {
	var ZipObject = function(name, data, options) {
		this.name = name;
		this.data = data;
		this.options = options
	};
	ZipObject.prototype = {
		asText : function() {
			var result = this.data;
			if (result === null || typeof result === "undefined")
				return "";
			if (this.options.base64)
				result = JSZipBase64.decode(result);
			if (this.options.binary)
				result = JSZip.prototype.utf8decode(result);
			return result
		},
		asBinary : function() {
			var result = this.data;
			if (result === null || typeof result === "undefined")
				return "";
			if (this.options.base64)
				result = JSZipBase64.decode(result);
			if (!this.options.binary)
				result = JSZip.prototype.utf8encode(result);
			return result
		},
		asUint8Array : function() {
			return JSZip.utils.string2Uint8Array(this.asBinary())
		},
		asArrayBuffer : function() {
			return JSZip.utils.string2Uint8Array(this.asBinary()).buffer
		}
	};
	var decToHex = function(dec, bytes) {
		var hex = "", i;
		for (i = 0; i < bytes; i++) {
			hex += String.fromCharCode(dec & 255);
			dec = dec >>> 8
		}
		return hex
	};
	var extend = function() {
		var result = {}, i, attr;
		for (i = 0; i < arguments.length; i++)
			for (attr in arguments[i])
				if (arguments[i].hasOwnProperty(attr)
						&& typeof result[attr] === "undefined")
					result[attr] = arguments[i][attr];
		return result
	};
	var prepareFileAttrs = function(o) {
		o = o || {};
		if (o.base64 === true && o.binary == null)
			o.binary = true;
		o = extend(o, JSZip.defaults);
		o.date = o.date || new Date;
		if (o.compression !== null)
			o.compression = o.compression.toUpperCase();
		return o
	};
	var fileAdd = function(name, data, o) {
		var parent = parentFolder(name);
		if (parent)
			folderAdd.call(this, parent);
		o = prepareFileAttrs(o);
		if (o.dir || data === null || typeof data === "undefined") {
			o.base64 = false;
			o.binary = false;
			data = null
		} else if (JSZip.support.uint8array && data instanceof Uint8Array) {
			o.base64 = false;
			o.binary = true;
			data = JSZip.utils.uint8Array2String(data)
		} else if (JSZip.support.arraybuffer && data instanceof ArrayBuffer) {
			o.base64 = false;
			o.binary = true;
			var bufferView = new Uint8Array(data);
			data = JSZip.utils.uint8Array2String(bufferView)
		} else if (o.binary && !o.base64) {
			if (o.optimizedBinaryString !== true)
				data = JSZip.utils.string2binary(data);
			delete o.optimizedBinaryString
		}
		return this.files[name] = new ZipObject(name, data, o)
	};
	var parentFolder = function(path) {
		if (path.slice(-1) == "/")
			path = path.substring(0, path.length - 1);
		var lastSlash = path.lastIndexOf("/");
		return lastSlash > 0 ? path.substring(0, lastSlash) : ""
	};
	var folderAdd = function(name) {
		if (name.slice(-1) != "/")
			name += "/";
		if (!this.files[name]) {
			var parent = parentFolder(name);
			if (parent)
				folderAdd.call(this, parent);
			fileAdd.call(this, name, null, {
				dir : true
			})
		}
		return this.files[name]
	};
	var prepareLocalHeaderData = function(file, utfEncodedFileName,
			compressionType) {
		var useUTF8 = utfEncodedFileName !== file.name, data = file.asBinary(), o = file.options, dosTime, dosDate;
		dosTime = o.date.getHours();
		dosTime = dosTime << 6;
		dosTime = dosTime | o.date.getMinutes();
		dosTime = dosTime << 5;
		dosTime = dosTime | o.date.getSeconds() / 2;
		dosDate = o.date.getFullYear() - 1980;
		dosDate = dosDate << 4;
		dosDate = dosDate | o.date.getMonth() + 1;
		dosDate = dosDate << 5;
		dosDate = dosDate | o.date.getDate();
		var hasData = data !== null && data.length !== 0;
		compressionType = o.compression || compressionType;
		if (!JSZip.compressions[compressionType])
			throw compressionType + " is not a valid compression method !";
		var compression = JSZip.compressions[compressionType];
		var compressedData = hasData ? compression.compress(data) : "";
		var header = "";
		header += "\n\x00";
		header += useUTF8 ? "\x00\b" : "\x00\x00";
		header += hasData ? compression.magic
				: JSZip.compressions["STORE"].magic;
		header += decToHex(dosTime, 2);
		header += decToHex(dosDate, 2);
		header += hasData ? decToHex(this.crc32(data), 4) : "\x00\x00\x00\x00";
		header += hasData ? decToHex(compressedData.length, 4)
				: "\x00\x00\x00\x00";
		header += hasData ? decToHex(data.length, 4) : "\x00\x00\x00\x00";
		header += decToHex(utfEncodedFileName.length, 2);
		header += "\x00\x00";
		return {
			header : header,
			compressedData : compressedData
		}
	};
	return {
		load : function(stream, options) {
			throw new Error(
					"Load method is not defined. Is the file jszip-load.js included ?");
		},
		filter : function(search) {
			var result = [], filename, relativePath, file, fileClone;
			for (filename in this.files) {
				if (!this.files.hasOwnProperty(filename))
					continue;
				file = this.files[filename];
				fileClone = new ZipObject(file.name, file.data,
						extend(file.options));
				relativePath = filename
						.slice(this.root.length, filename.length);
				if (filename.slice(0, this.root.length) === this.root
						&& search(relativePath, fileClone))
					result.push(fileClone)
			}
			return result
		},
		file : function(name, data, o) {
			if (arguments.length === 1)
				if (name instanceof RegExp) {
					var regexp = name;
					return this.filter(function(relativePath, file) {
						return !file.options.dir && regexp.test(relativePath)
					})
				} else
					return this.filter(function(relativePath, file) {
						return !file.options.dir && relativePath === name
					})[0] || null;
			else {
				name = this.root + name;
				fileAdd.call(this, name, data, o)
			}
			return this
		},
		folder : function(arg) {
			if (!arg)
				return this;
			if (arg instanceof RegExp)
				return this.filter(function(relativePath, file) {
					return file.options.dir && arg.test(relativePath)
				});
			var name = this.root + arg;
			var newFolder = folderAdd.call(this, name);
			var ret = this.clone();
			ret.root = newFolder.name;
			return ret
		},
		remove : function(name) {
			name = this.root + name;
			var file = this.files[name];
			if (!file) {
				if (name.slice(-1) != "/")
					name += "/";
				file = this.files[name]
			}
			if (file)
				if (!file.options.dir)
					delete this.files[name];
				else {
					var kids = this.filter(function(relativePath, file) {
						return file.name.slice(0, name.length) === name
					});
					for (var i = 0; i < kids.length; i++)
						delete this.files[kids[i].name]
				}
			return this
		},
		generate : function(options) {
			options = extend(options || {}, {
				base64 : true,
				compression : "STORE",
				type : "base64"
			});
			var compression = options.compression.toUpperCase();
			if (!JSZip.compressions[compression])
				throw compression + " is not a valid compression method !";
			var directory = [], files = [], fileOffset = 0;
			for ( var name in this.files) {
				if (!this.files.hasOwnProperty(name))
					continue;
				var file = this.files[name];
				var utfEncodedFileName = this.utf8encode(file.name);
				var fileRecord = "", dirRecord = "", data = prepareLocalHeaderData
						.call(this, file, utfEncodedFileName, compression);
				fileRecord = JSZip.signature.LOCAL_FILE_HEADER + data.header
						+ utfEncodedFileName + data.compressedData;
				dirRecord = JSZip.signature.CENTRAL_FILE_HEADER
						+ "\u0014\x00"
						+ data.header
						+ "\x00\x00"
						+ "\x00\x00"
						+ "\x00\x00"
						+ (this.files[name].options.dir === true ? "\u0010\x00\x00\x00"
								: "\x00\x00\x00\x00") + decToHex(fileOffset, 4)
						+ utfEncodedFileName;
				fileOffset += fileRecord.length;
				files.push(fileRecord);
				directory.push(dirRecord)
			}
			var fileData = files.join("");
			var dirData = directory.join("");
			var dirEnd = "";
			dirEnd = JSZip.signature.CENTRAL_DIRECTORY_END + "\x00\x00"
					+ "\x00\x00" + decToHex(files.length, 2)
					+ decToHex(files.length, 2) + decToHex(dirData.length, 4)
					+ decToHex(fileData.length, 4) + "\x00\x00";
			var zip = fileData + dirData + dirEnd;
			switch (options.type.toLowerCase()) {
			case "uint8array":
				return JSZip.utils.string2Uint8Array(zip);
			case "arraybuffer":
				return JSZip.utils.string2Uint8Array(zip).buffer;
			case "blob":
				return JSZip.utils.string2Blob(zip);
			case "base64":
				return options.base64 ? JSZipBase64.encode(zip) : zip;
			default:
				return zip
			}
		},
		crc32 : function(str, crc) {
			if (str === "" || typeof str === "undefined")
				return 0;
			var table = [ 0, 1996959894, 3993919788, 2567524794, 124634137,
					1886057615, 3915621685, 2657392035, 249268274, 2044508324,
					3772115230, 2547177864, 162941995, 2125561021, 3887607047,
					2428444049, 498536548, 1789927666, 4089016648, 2227061214,
					450548861, 1843258603, 4107580753, 2211677639, 325883990,
					1684777152, 4251122042, 2321926636, 335633487, 1661365465,
					4195302755, 2366115317, 997073096, 1281953886, 3579855332,
					2724688242, 1006888145, 1258607687, 3524101629, 2768942443,
					901097722, 1119000684, 3686517206, 2898065728, 853044451,
					1172266101, 3705015759, 2882616665, 651767980, 1373503546,
					3369554304, 3218104598, 565507253, 1454621731, 3485111705,
					3099436303, 671266974, 1594198024, 3322730930, 2970347812,
					795835527, 1483230225, 3244367275, 3060149565, 1994146192,
					31158534, 2563907772, 4023717930, 1907459465, 112637215,
					2680153253, 3904427059, 2013776290, 251722036, 2517215374,
					3775830040, 2137656763, 141376813, 2439277719, 3865271297,
					1802195444, 476864866, 2238001368, 4066508878, 1812370925,
					453092731, 2181625025, 4111451223, 1706088902, 314042704,
					2344532202, 4240017532, 1658658271, 366619977, 2362670323,
					4224994405, 1303535960, 984961486, 2747007092, 3569037538,
					1256170817, 1037604311, 2765210733, 3554079995, 1131014506,
					879679996, 2909243462, 3663771856, 1141124467, 855842277,
					2852801631, 3708648649, 1342533948, 654459306, 3188396048,
					3373015174, 1466479909, 544179635, 3110523913, 3462522015,
					1591671054, 702138776, 2966460450, 3352799412, 1504918807,
					783551873, 3082640443, 3233442989, 3988292384, 2596254646,
					62317068, 1957810842, 3939845945, 2647816111, 81470997,
					1943803523, 3814918930, 2489596804, 225274430, 2053790376,
					3826175755, 2466906013, 167816743, 2097651377, 4027552580,
					2265490386, 503444072, 1762050814, 4150417245, 2154129355,
					426522225, 1852507879, 4275313526, 2312317920, 282753626,
					1742555852, 4189708143, 2394877945, 397917763, 1622183637,
					3604390888, 2714866558, 953729732, 1340076626, 3518719985,
					2797360999, 1068828381, 1219638859, 3624741850, 2936675148,
					906185462, 1090812512, 3747672003, 2825379669, 829329135,
					1181335161, 3412177804, 3160834842, 628085408, 1382605366,
					3423369109, 3138078467, 570562233, 1426400815, 3317316542,
					2998733608, 733239954, 1555261956, 3268935591, 3050360625,
					752459403, 1541320221, 2607071920, 3965973030, 1969922972,
					40735498, 2617837225, 3943577151, 1913087877, 83908371,
					2512341634, 3803740692, 2075208622, 213261112, 2463272603,
					3855990285, 2094854071, 198958881, 2262029012, 4057260610,
					1759359992, 534414190, 2176718541, 4139329115, 1873836001,
					414664567, 2282248934, 4279200368, 1711684554, 285281116,
					2405801727, 4167216745, 1634467795, 376229701, 2685067896,
					3608007406, 1308918612, 956543938, 2808555105, 3495958263,
					1231636301, 1047427035, 2932959818, 3654703836, 1088359270,
					936918E3, 2847714899, 3736837829, 1202900863, 817233897,
					3183342108, 3401237130, 1404277552, 615818150, 3134207493,
					3453421203, 1423857449, 601450431, 3009837614, 3294710456,
					1567103746, 711928724, 3020668471, 3272380065, 1510334235,
					755167117 ];
			if (typeof crc == "undefined")
				crc = 0;
			var x = 0;
			var y = 0;
			crc = crc ^ -1;
			for (var i = 0, iTop = str.length; i < iTop; i++) {
				y = (crc ^ str.charCodeAt(i)) & 255;
				x = table[y];
				crc = crc >>> 8 ^ x
			}
			return crc ^ -1
		},
		clone : function() {
			var newObj = new JSZip;
			for ( var i in this)
				if (typeof this[i] !== "function")
					newObj[i] = this[i];
			return newObj
		},
		utf8encode : function(string) {
			var utftext = "";
			for (var n = 0; n < string.length; n++) {
				var c = string.charCodeAt(n);
				if (c < 128)
					utftext += String.fromCharCode(c);
				else if (c > 127 && c < 2048) {
					utftext += String.fromCharCode(c >> 6 | 192);
					utftext += String.fromCharCode(c & 63 | 128)
				} else {
					utftext += String.fromCharCode(c >> 12 | 224);
					utftext += String.fromCharCode(c >> 6 & 63 | 128);
					utftext += String.fromCharCode(c & 63 | 128)
				}
			}
			return utftext
		},
		utf8decode : function(utftext) {
			var string = "";
			var i = 0;
			var c = 0, c1 = 0, c2 = 0, c3 = 0;
			while (i < utftext.length) {
				c = utftext.charCodeAt(i);
				if (c < 128) {
					string += String.fromCharCode(c);
					i++
				} else if (c > 191 && c < 224) {
					c2 = utftext.charCodeAt(i + 1);
					string += String.fromCharCode((c & 31) << 6 | c2 & 63);
					i += 2
				} else {
					c2 = utftext.charCodeAt(i + 1);
					c3 = utftext.charCodeAt(i + 2);
					string += String.fromCharCode((c & 15) << 12
							| (c2 & 63) << 6 | c3 & 63);
					i += 3
				}
			}
			return string
		}
	}
}();
JSZip.compressions = {
	"STORE" : {
		magic : "\x00\x00",
		compress : function(content) {
			return content
		},
		uncompress : function(content) {
			return content
		}
	}
};
JSZip.support = {
	arraybuffer : function() {
		return typeof ArrayBuffer !== "undefined"
				&& typeof Uint8Array !== "undefined"
	}(),
	uint8array : function() {
		return typeof Uint8Array !== "undefined"
	}(),
	blob : function() {
		if (typeof ArrayBuffer === "undefined")
			return false;
		var buffer = new ArrayBuffer(0);
		try {
			return (new Blob([ buffer ], {
				type : "application/zip"
			})).size === 0
		} catch (e) {
		}
		try {
			var builder = new (window.BlobBuilder || window.WebKitBlobBuilder
					|| window.MozBlobBuilder || window.MSBlobBuilder);
			builder.append(buffer);
			return builder.getBlob("application/zip").size === 0
		} catch (e) {
		}
		return false
	}()
};
JSZip.utils = {
	string2binary : function(str) {
		var result = "";
		for (var i = 0; i < str.length; i++)
			result += String.fromCharCode(str.charCodeAt(i) & 255);
		return result
	},
	string2Uint8Array : function(str) {
		if (!JSZip.support.uint8array)
			throw new Error("Uint8Array is not supported by this browser");
		var buffer = new ArrayBuffer(str.length);
		var bufferView = new Uint8Array(buffer);
		for (var i = 0; i < str.length; i++)
			bufferView[i] = str.charCodeAt(i);
		return bufferView
	},
	uint8Array2String : function(array) {
		if (!JSZip.support.uint8array)
			throw new Error("Uint8Array is not supported by this browser");
		var result = "";
		for (var i = 0; i < array.length; i++)
			result += String.fromCharCode(array[i]);
		return result
	},
	string2Blob : function(str) {
		if (!JSZip.support.blob)
			throw new Error("Blob is not supported by this browser");
		var buffer = JSZip.utils.string2Uint8Array(str).buffer;
		try {
			return new Blob([ buffer ], {
				type : "application/zip"
			})
		} catch (e) {
		}
		try {
			var builder = new (window.BlobBuilder || window.WebKitBlobBuilder
					|| window.MozBlobBuilder || window.MSBlobBuilder);
			builder.append(buffer);
			return builder.getBlob("application/zip")
		} catch (e) {
		}
		throw new Error("Bug : can't construct the Blob.");
	}
};
var JSZipBase64 = function() {
	var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	return {
		encode : function(input, utf8) {
			var output = "";
			var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
			var i = 0;
			while (i < input.length) {
				chr1 = input.charCodeAt(i++);
				chr2 = input.charCodeAt(i++);
				chr3 = input.charCodeAt(i++);
				enc1 = chr1 >> 2;
				enc2 = (chr1 & 3) << 4 | chr2 >> 4;
				enc3 = (chr2 & 15) << 2 | chr3 >> 6;
				enc4 = chr3 & 63;
				if (isNaN(chr2))
					enc3 = enc4 = 64;
				else if (isNaN(chr3))
					enc4 = 64;
				output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2)
						+ _keyStr.charAt(enc3) + _keyStr.charAt(enc4)
			}
			return output
		},
		decode : function(input, utf8) {
			var output = "";
			var chr1, chr2, chr3;
			var enc1, enc2, enc3, enc4;
			var i = 0;
			input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
			while (i < input.length) {
				enc1 = _keyStr.indexOf(input.charAt(i++));
				enc2 = _keyStr.indexOf(input.charAt(i++));
				enc3 = _keyStr.indexOf(input.charAt(i++));
				enc4 = _keyStr.indexOf(input.charAt(i++));
				chr1 = enc1 << 2 | enc2 >> 4;
				chr2 = (enc2 & 15) << 4 | enc3 >> 2;
				chr3 = (enc3 & 3) << 6 | enc4;
				output = output + String.fromCharCode(chr1);
				if (enc3 != 64)
					output = output + String.fromCharCode(chr2);
				if (enc4 != 64)
					output = output + String.fromCharCode(chr3)
			}
			return output
		}
	}
}();
(function() {
	var MAX_VALUE_16BITS = 65535;
	var MAX_VALUE_32BITS = -1;
	var pretty = function(str) {
		var res = "", code, i;
		for (i = 0; i < (str || "").length; i++) {
			code = str.charCodeAt(i);
			res += "\\x" + (code < 16 ? "0" : "")
					+ code.toString(16).toUpperCase()
		}
		return res
	};
	var findCompression = function(compressionMethod) {
		for ( var method in JSZip.compressions) {
			if (!JSZip.compressions.hasOwnProperty(method))
				continue;
			if (JSZip.compressions[method].magic === compressionMethod)
				return JSZip.compressions[method]
		}
		return null
	};
	function StreamReader(stream) {
		this.stream = "";
		if (JSZip.support.uint8array && stream instanceof Uint8Array)
			this.stream = JSZip.utils.uint8Array2String(stream);
		else if (JSZip.support.arraybuffer && stream instanceof ArrayBuffer) {
			var bufferView = new Uint8Array(stream);
			this.stream = JSZip.utils.uint8Array2String(bufferView)
		} else
			this.stream = JSZip.utils.string2binary(stream);
		this.index = 0
	}
	StreamReader.prototype = {
		checkOffset : function(offset) {
			this.checkIndex(this.index + offset)
		},
		checkIndex : function(newIndex) {
			if (this.stream.length < newIndex || newIndex < 0)
				throw new Error("End of stream reached (stream length = "
						+ this.stream.length + ", asked index = " + newIndex
						+ "). Corrupted zip ?");
		},
		setIndex : function(newIndex) {
			this.checkIndex(newIndex);
			this.index = newIndex
		},
		skip : function(n) {
			this.setIndex(this.index + n)
		},
		byteAt : function(i) {
			return this.stream.charCodeAt(i)
		},
		readInt : function(size) {
			var result = 0, i;
			this.checkOffset(size);
			for (i = this.index + size - 1; i >= this.index; i--)
				result = (result << 8) + this.byteAt(i);
			this.index += size;
			return result
		},
		readString : function(size) {
			this.checkOffset(size);
			var result = this.stream.slice(this.index, this.index + size);
			this.index += size;
			return result
		},
		readDate : function() {
			var dostime = this.readInt(4);
			return new Date((dostime >> 25 & 127) + 1980,
					(dostime >> 21 & 15) - 1, dostime >> 16 & 31,
					dostime >> 11 & 31, dostime >> 5 & 63, (dostime & 31) << 1)
		}
	};
	function ZipEntry(options, loadOptions) {
		this.options = options;
		this.loadOptions = loadOptions
	}
	ZipEntry.prototype = {
		isEncrypted : function() {
			return (this.bitFlag & 1) === 1
		},
		useUTF8 : function() {
			return (this.bitFlag & 2048) === 2048
		},
		readLocalPart : function(reader) {
			var compression, localExtraFieldsLength;
			reader.skip(22);
			this.fileNameLength = reader.readInt(2);
			localExtraFieldsLength = reader.readInt(2);
			this.fileName = reader.readString(this.fileNameLength);
			reader.skip(localExtraFieldsLength);
			if (this.compressedSize == -1 || this.uncompressedSize == -1)
				throw new Error(
						"Bug or corrupted zip : didn't get enough informations from the central directory "
								+ "(compressedSize == -1 || uncompressedSize == -1)");
			this.compressedFileData = reader.readString(this.compressedSize);
			compression = findCompression(this.compressionMethod);
			if (compression === null)
				throw new Error("Corrupted zip : compression "
						+ pretty(this.compressionMethod)
						+ " unknown (inner file : " + this.fileName + ")");
			this.uncompressedFileData = compression
					.uncompress(this.compressedFileData);
			if (this.uncompressedFileData.length !== this.uncompressedSize)
				throw new Error("Bug : uncompressed data size mismatch");
			if (this.loadOptions.checkCRC32
					&& JSZip.prototype.crc32(this.uncompressedFileData) !== this.crc32)
				throw new Error("Corrupted zip : CRC32 mismatch");
		},
		readCentralPart : function(reader) {
			this.versionMadeBy = reader.readString(2);
			this.versionNeeded = reader.readInt(2);
			this.bitFlag = reader.readInt(2);
			this.compressionMethod = reader.readString(2);
			this.date = reader.readDate();
			this.crc32 = reader.readInt(4);
			this.compressedSize = reader.readInt(4);
			this.uncompressedSize = reader.readInt(4);
			this.fileNameLength = reader.readInt(2);
			this.extraFieldsLength = reader.readInt(2);
			this.fileCommentLength = reader.readInt(2);
			this.diskNumberStart = reader.readInt(2);
			this.internalFileAttributes = reader.readInt(2);
			this.externalFileAttributes = reader.readInt(4);
			this.localHeaderOffset = reader.readInt(4);
			if (this.isEncrypted())
				throw new Error("Encrypted zip are not supported");
			this.fileName = reader.readString(this.fileNameLength);
			this.readExtraFields(reader);
			this.parseZIP64ExtraField(reader);
			this.fileComment = reader.readString(this.fileCommentLength);
			this.dir = this.externalFileAttributes & 16 ? true : false
		},
		parseZIP64ExtraField : function(reader) {
			if (!this.extraFields[1])
				return;
			var extraReader = new StreamReader(this.extraFields[1].value);
			if (this.uncompressedSize === MAX_VALUE_32BITS)
				this.uncompressedSize = extraReader.readInt(8);
			if (this.compressedSize === MAX_VALUE_32BITS)
				this.compressedSize = extraReader.readInt(8);
			if (this.localHeaderOffset === MAX_VALUE_32BITS)
				this.localHeaderOffset = extraReader.readInt(8);
			if (this.diskNumberStart === MAX_VALUE_32BITS)
				this.diskNumberStart = extraReader.readInt(4)
		},
		readExtraFields : function(reader) {
			var start = reader.index, extraFieldId, extraFieldLength, extraFieldValue;
			this.extraFields = this.extraFields || {};
			while (reader.index < start + this.extraFieldsLength) {
				extraFieldId = reader.readInt(2);
				extraFieldLength = reader.readInt(2);
				extraFieldValue = reader.readString(extraFieldLength);
				this.extraFields[extraFieldId] = {
					id : extraFieldId,
					length : extraFieldLength,
					value : extraFieldValue
				}
			}
		},
		handleUTF8 : function() {
			if (this.useUTF8()) {
				this.fileName = JSZip.prototype.utf8decode(this.fileName);
				this.fileComment = JSZip.prototype.utf8decode(this.fileComment)
			}
		}
	};
	function ZipEntries(data, loadOptions) {
		this.files = [];
		this.loadOptions = loadOptions;
		if (data)
			this.load(data)
	}
	ZipEntries.prototype = {
		checkSignature : function(expectedSignature) {
			var signature = this.reader.readString(4);
			if (signature !== expectedSignature)
				throw new Error("Corrupted zip or bug : unexpected signature "
						+ "(" + pretty(signature) + ", expected "
						+ pretty(expectedSignature) + ")");
		},
		readBlockEndOfCentral : function() {
			this.diskNumber = this.reader.readInt(2);
			this.diskWithCentralDirStart = this.reader.readInt(2);
			this.centralDirRecordsOnThisDisk = this.reader.readInt(2);
			this.centralDirRecords = this.reader.readInt(2);
			this.centralDirSize = this.reader.readInt(4);
			this.centralDirOffset = this.reader.readInt(4);
			this.zipCommentLength = this.reader.readInt(2);
			this.zipComment = this.reader.readString(this.zipCommentLength)
		},
		readBlockZip64EndOfCentral : function() {
			this.zip64EndOfCentralSize = this.reader.readInt(8);
			this.versionMadeBy = this.reader.readString(2);
			this.versionNeeded = this.reader.readInt(2);
			this.diskNumber = this.reader.readInt(4);
			this.diskWithCentralDirStart = this.reader.readInt(4);
			this.centralDirRecordsOnThisDisk = this.reader.readInt(8);
			this.centralDirRecords = this.reader.readInt(8);
			this.centralDirSize = this.reader.readInt(8);
			this.centralDirOffset = this.reader.readInt(8);
			this.zip64ExtensibleData = {};
			var extraDataSize = this.zip64EndOfCentralSize - 44, index = 0, extraFieldId, extraFieldLength, extraFieldValue;
			while (index < extraDataSize) {
				extraFieldId = this.reader.readInt(2);
				extraFieldLength = this.reader.readInt(4);
				extraFieldValue = this.reader.readString(extraFieldLength);
				this.zip64ExtensibleData[extraFieldId] = {
					id : extraFieldId,
					length : extraFieldLength,
					value : extraFieldValue
				}
			}
		},
		readBlockZip64EndOfCentralLocator : function() {
			this.diskWithZip64CentralDirStart = this.reader.readInt(4);
			this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8);
			this.disksCount = this.reader.readInt(4);
			if (this.disksCount > 1)
				throw new Error("Multi-volumes zip are not supported");
		},
		readLocalFiles : function() {
			var i, file;
			for (i = 0; i < this.files.length; i++) {
				file = this.files[i];
				this.reader.setIndex(file.localHeaderOffset);
				this.checkSignature(JSZip.signature.LOCAL_FILE_HEADER);
				file.readLocalPart(this.reader);
				file.handleUTF8()
			}
		},
		readCentralDir : function() {
			var file;
			this.reader.setIndex(this.centralDirOffset);
			while (this.reader.readString(4) === JSZip.signature.CENTRAL_FILE_HEADER) {
				file = new ZipEntry({
					zip64 : this.zip64
				}, this.loadOptions);
				file.readCentralPart(this.reader);
				this.files.push(file)
			}
		},
		readEndOfCentral : function() {
			var offset = this.reader.stream
					.lastIndexOf(JSZip.signature.CENTRAL_DIRECTORY_END);
			if (offset === -1)
				throw new Error(
						"Corrupted zip : can't find end of central directory");
			this.reader.setIndex(offset);
			this.checkSignature(JSZip.signature.CENTRAL_DIRECTORY_END);
			this.readBlockEndOfCentral();
			if (this.diskNumber === MAX_VALUE_16BITS
					|| this.diskWithCentralDirStart === MAX_VALUE_16BITS
					|| this.centralDirRecordsOnThisDisk === MAX_VALUE_16BITS
					|| this.centralDirRecords === MAX_VALUE_16BITS
					|| this.centralDirSize === MAX_VALUE_32BITS
					|| this.centralDirOffset === MAX_VALUE_32BITS) {
				this.zip64 = true;
				offset = this.reader.stream
						.lastIndexOf(JSZip.signature.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
				if (offset === -1)
					throw new Error(
							"Corrupted zip : can't find the ZIP64 end of central directory locator");
				this.reader.setIndex(offset);
				this
						.checkSignature(JSZip.signature.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
				this.readBlockZip64EndOfCentralLocator();
				this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir);
				this
						.checkSignature(JSZip.signature.ZIP64_CENTRAL_DIRECTORY_END);
				this.readBlockZip64EndOfCentral()
			}
		},
		load : function(data) {
			this.reader = new StreamReader(data);
			this.readEndOfCentral();
			this.readCentralDir();
			this.readLocalFiles()
		}
	};
	JSZip.prototype.load = function(data, options) {
		var files, zipEntries, i, input;
		options = options || {};
		if (options.base64)
			data = JSZipBase64.decode(data);
		zipEntries = new ZipEntries(data, options);
		files = zipEntries.files;
		for (i = 0; i < files.length; i++) {
			input = files[i];
			this.file(input.fileName, input.uncompressedFileData, {
				binary : true,
				optimizedBinaryString : true,
				date : input.date,
				dir : input.dir
			})
		}
		return this
	}
})();
if (!JSZip)
	throw "JSZip not defined";
(function() {
	var zip_fixed_bd;
	var zip_WSIZE = 32768;
	var zip_STORED_BLOCK = 0;
	var zip_STATIC_TREES = 1;
	var zip_DYN_TREES = 2;
	var zip_lbits = 9;
	var zip_dbits = 6;
	var zip_INBUFSIZ = 32768;
	var zip_INBUF_EXTRA = 64;
	var zip_slide;
	var zip_wp;
	var zip_fixed_tl = null;
	var zip_fixed_td;
	var zip_fixed_bl, fixed_bd;
	var zip_bit_buf;
	var zip_bit_len;
	var zip_method;
	var zip_eof;
	var zip_copy_leng;
	var zip_copy_dist;
	var zip_tl, zip_td;
	var zip_bl, zip_bd;
	var zip_inflate_data;
	var zip_inflate_pos;
	var zip_MASK_BITS = new Array(0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023,
			2047, 4095, 8191, 16383, 32767, 65535);
	var zip_cplens = new Array(3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23,
			27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258,
			0, 0);
	var zip_cplext = new Array(0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2,
			3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 99, 99);
	var zip_cpdist = new Array(1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97,
			129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,
			8193, 12289, 16385, 24577);
	var zip_cpdext = new Array(0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6,
			7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13);
	var zip_border = new Array(16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3,
			13, 2, 14, 1, 15);
	function zip_HuftList() {
		this.next = null;
		this.list = null
	}
	function zip_HuftNode() {
		this.e = 0;
		this.b = 0;
		this.n = 0;
		this.t = null
	}
	function zip_HuftBuild(b, n, s, d, e, mm) {
		this.BMAX = 16;
		this.N_MAX = 288;
		this.status = 0;
		this.root = null;
		this.m = 0;
		var a;
		var c = new Array(this.BMAX + 1);
		var el;
		var f;
		var g;
		var h;
		var i;
		var j;
		var k;
		var lx = new Array(this.BMAX + 1);
		var p;
		var pidx;
		var q;
		var r = new zip_HuftNode;
		var u = new Array(this.BMAX);
		var v = new Array(this.N_MAX);
		var w;
		var x = new Array(this.BMAX + 1);
		var xp;
		var y;
		var z;
		var o;
		var tail;
		tail = this.root = null;
		for (i = 0; i < c.length; i++)
			c[i] = 0;
		for (i = 0; i < lx.length; i++)
			lx[i] = 0;
		for (i = 0; i < u.length; i++)
			u[i] = null;
		for (i = 0; i < v.length; i++)
			v[i] = 0;
		for (i = 0; i < x.length; i++)
			x[i] = 0;
		el = n > 256 ? b[256] : this.BMAX;
		p = b;
		pidx = 0;
		i = n;
		do {
			c[p[pidx]]++;
			pidx++
		} while (--i > 0);
		if (c[0] == n) {
			this.root = null;
			this.m = 0;
			this.status = 0;
			return
		}
		for (j = 1; j <= this.BMAX; j++)
			if (c[j] != 0)
				break;
		k = j;
		if (mm < j)
			mm = j;
		for (i = this.BMAX; i != 0; i--)
			if (c[i] != 0)
				break;
		g = i;
		if (mm > i)
			mm = i;
		for (y = 1 << j; j < i; j++, y <<= 1)
			if ((y -= c[j]) < 0) {
				this.status = 2;
				this.m = mm;
				return
			}
		if ((y -= c[i]) < 0) {
			this.status = 2;
			this.m = mm;
			return
		}
		c[i] += y;
		x[1] = j = 0;
		p = c;
		pidx = 1;
		xp = 2;
		while (--i > 0)
			x[xp++] = j += p[pidx++];
		p = b;
		pidx = 0;
		i = 0;
		do
			if ((j = p[pidx++]) != 0)
				v[x[j]++] = i;
		while (++i < n);
		n = x[g];
		x[0] = i = 0;
		p = v;
		pidx = 0;
		h = -1;
		w = lx[0] = 0;
		q = null;
		z = 0;
		for (; k <= g; k++) {
			a = c[k];
			while (a-- > 0) {
				while (k > w + lx[1 + h]) {
					w += lx[1 + h];
					h++;
					z = (z = g - w) > mm ? mm : z;
					if ((f = 1 << (j = k - w)) > a + 1) {
						f -= a + 1;
						xp = k;
						while (++j < z) {
							if ((f <<= 1) <= c[++xp])
								break;
							f -= c[xp]
						}
					}
					if (w + j > el && w < el)
						j = el - w;
					z = 1 << j;
					lx[1 + h] = j;
					q = new Array(z);
					for (o = 0; o < z; o++)
						q[o] = new zip_HuftNode;
					if (tail == null)
						tail = this.root = new zip_HuftList;
					else
						tail = tail.next = new zip_HuftList;
					tail.next = null;
					tail.list = q;
					u[h] = q;
					if (h > 0) {
						x[h] = i;
						r.b = lx[h];
						r.e = 16 + j;
						r.t = q;
						j = (i & (1 << w) - 1) >> w - lx[h];
						u[h - 1][j].e = r.e;
						u[h - 1][j].b = r.b;
						u[h - 1][j].n = r.n;
						u[h - 1][j].t = r.t
					}
				}
				r.b = k - w;
				if (pidx >= n)
					r.e = 99;
				else if (p[pidx] < s) {
					r.e = p[pidx] < 256 ? 16 : 15;
					r.n = p[pidx++]
				} else {
					r.e = e[p[pidx] - s];
					r.n = d[p[pidx++] - s]
				}
				f = 1 << k - w;
				for (j = i >> w; j < z; j += f) {
					q[j].e = r.e;
					q[j].b = r.b;
					q[j].n = r.n;
					q[j].t = r.t
				}
				for (j = 1 << k - 1; (i & j) != 0; j >>= 1)
					i ^= j;
				i ^= j;
				while ((i & (1 << w) - 1) != x[h]) {
					w -= lx[h];
					h--
				}
			}
		}
		this.m = lx[1];
		this.status = y != 0 && g != 1 ? 1 : 0
	}
	function zip_GET_BYTE() {
		if (zip_inflate_data.length == zip_inflate_pos)
			return -1;
		return zip_inflate_data.charCodeAt(zip_inflate_pos++) & 255
	}
	function zip_NEEDBITS(n) {
		while (zip_bit_len < n) {
			zip_bit_buf |= zip_GET_BYTE() << zip_bit_len;
			zip_bit_len += 8
		}
	}
	function zip_GETBITS(n) {
		return zip_bit_buf & zip_MASK_BITS[n]
	}
	function zip_DUMPBITS(n) {
		zip_bit_buf >>= n;
		zip_bit_len -= n
	}
	function zip_inflate_codes(buff, off, size) {
		var e;
		var t;
		var n;
		if (size == 0)
			return 0;
		n = 0;
		for (;;) {
			zip_NEEDBITS(zip_bl);
			t = zip_tl.list[zip_GETBITS(zip_bl)];
			e = t.e;
			while (e > 16) {
				if (e == 99)
					return -1;
				zip_DUMPBITS(t.b);
				e -= 16;
				zip_NEEDBITS(e);
				t = t.t[zip_GETBITS(e)];
				e = t.e
			}
			zip_DUMPBITS(t.b);
			if (e == 16) {
				zip_wp &= zip_WSIZE - 1;
				buff[off + n++] = zip_slide[zip_wp++] = t.n;
				if (n == size)
					return size;
				continue
			}
			if (e == 15)
				break;
			zip_NEEDBITS(e);
			zip_copy_leng = t.n + zip_GETBITS(e);
			zip_DUMPBITS(e);
			zip_NEEDBITS(zip_bd);
			t = zip_td.list[zip_GETBITS(zip_bd)];
			e = t.e;
			while (e > 16) {
				if (e == 99)
					return -1;
				zip_DUMPBITS(t.b);
				e -= 16;
				zip_NEEDBITS(e);
				t = t.t[zip_GETBITS(e)];
				e = t.e
			}
			zip_DUMPBITS(t.b);
			zip_NEEDBITS(e);
			zip_copy_dist = zip_wp - t.n - zip_GETBITS(e);
			zip_DUMPBITS(e);
			while (zip_copy_leng > 0 && n < size) {
				zip_copy_leng--;
				zip_copy_dist &= zip_WSIZE - 1;
				zip_wp &= zip_WSIZE - 1;
				buff[off + n++] = zip_slide[zip_wp++] = zip_slide[zip_copy_dist++]
			}
			if (n == size)
				return size
		}
		zip_method = -1;
		return n
	}
	function zip_inflate_stored(buff, off, size) {
		var n;
		n = zip_bit_len & 7;
		zip_DUMPBITS(n);
		zip_NEEDBITS(16);
		n = zip_GETBITS(16);
		zip_DUMPBITS(16);
		zip_NEEDBITS(16);
		if (n != (~zip_bit_buf & 65535))
			return -1;
		zip_DUMPBITS(16);
		zip_copy_leng = n;
		n = 0;
		while (zip_copy_leng > 0 && n < size) {
			zip_copy_leng--;
			zip_wp &= zip_WSIZE - 1;
			zip_NEEDBITS(8);
			buff[off + n++] = zip_slide[zip_wp++] = zip_GETBITS(8);
			zip_DUMPBITS(8)
		}
		if (zip_copy_leng == 0)
			zip_method = -1;
		return n
	}
	function zip_inflate_fixed(buff, off, size) {
		if (zip_fixed_tl == null) {
			var i;
			var l = new Array(288);
			var h;
			for (i = 0; i < 144; i++)
				l[i] = 8;
			for (; i < 256; i++)
				l[i] = 9;
			for (; i < 280; i++)
				l[i] = 7;
			for (; i < 288; i++)
				l[i] = 8;
			zip_fixed_bl = 7;
			h = new zip_HuftBuild(l, 288, 257, zip_cplens, zip_cplext,
					zip_fixed_bl);
			if (h.status != 0) {
				alert("HufBuild error: " + h.status);
				return -1
			}
			zip_fixed_tl = h.root;
			zip_fixed_bl = h.m;
			for (i = 0; i < 30; i++)
				l[i] = 5;
			zip_fixed_bd = 5;
			h = new zip_HuftBuild(l, 30, 0, zip_cpdist, zip_cpdext,
					zip_fixed_bd);
			if (h.status > 1) {
				zip_fixed_tl = null;
				alert("HufBuild error: " + h.status);
				return -1
			}
			zip_fixed_td = h.root;
			zip_fixed_bd = h.m
		}
		zip_tl = zip_fixed_tl;
		zip_td = zip_fixed_td;
		zip_bl = zip_fixed_bl;
		zip_bd = zip_fixed_bd;
		return zip_inflate_codes(buff, off, size)
	}
	function zip_inflate_dynamic(buff, off, size) {
		var i;
		var j;
		var l;
		var n;
		var t;
		var nb;
		var nl;
		var nd;
		var ll = new Array(286 + 30);
		var h;
		for (i = 0; i < ll.length; i++)
			ll[i] = 0;
		zip_NEEDBITS(5);
		nl = 257 + zip_GETBITS(5);
		zip_DUMPBITS(5);
		zip_NEEDBITS(5);
		nd = 1 + zip_GETBITS(5);
		zip_DUMPBITS(5);
		zip_NEEDBITS(4);
		nb = 4 + zip_GETBITS(4);
		zip_DUMPBITS(4);
		if (nl > 286 || nd > 30)
			return -1;
		for (j = 0; j < nb; j++) {
			zip_NEEDBITS(3);
			ll[zip_border[j]] = zip_GETBITS(3);
			zip_DUMPBITS(3)
		}
		for (; j < 19; j++)
			ll[zip_border[j]] = 0;
		zip_bl = 7;
		h = new zip_HuftBuild(ll, 19, 19, null, null, zip_bl);
		if (h.status != 0)
			return -1;
		zip_tl = h.root;
		zip_bl = h.m;
		n = nl + nd;
		i = l = 0;
		while (i < n) {
			zip_NEEDBITS(zip_bl);
			t = zip_tl.list[zip_GETBITS(zip_bl)];
			j = t.b;
			zip_DUMPBITS(j);
			j = t.n;
			if (j < 16)
				ll[i++] = l = j;
			else if (j == 16) {
				zip_NEEDBITS(2);
				j = 3 + zip_GETBITS(2);
				zip_DUMPBITS(2);
				if (i + j > n)
					return -1;
				while (j-- > 0)
					ll[i++] = l
			} else if (j == 17) {
				zip_NEEDBITS(3);
				j = 3 + zip_GETBITS(3);
				zip_DUMPBITS(3);
				if (i + j > n)
					return -1;
				while (j-- > 0)
					ll[i++] = 0;
				l = 0
			} else {
				zip_NEEDBITS(7);
				j = 11 + zip_GETBITS(7);
				zip_DUMPBITS(7);
				if (i + j > n)
					return -1;
				while (j-- > 0)
					ll[i++] = 0;
				l = 0
			}
		}
		zip_bl = zip_lbits;
		h = new zip_HuftBuild(ll, nl, 257, zip_cplens, zip_cplext, zip_bl);
		if (zip_bl == 0)
			h.status = 1;
		if (h.status != 0) {
			if (h.status == 1)
				;
			return -1
		}
		zip_tl = h.root;
		zip_bl = h.m;
		for (i = 0; i < nd; i++)
			ll[i] = ll[i + nl];
		zip_bd = zip_dbits;
		h = new zip_HuftBuild(ll, nd, 0, zip_cpdist, zip_cpdext, zip_bd);
		zip_td = h.root;
		zip_bd = h.m;
		if (zip_bd == 0 && nl > 257)
			return -1;
		if (h.status == 1)
			;
		if (h.status != 0)
			return -1;
		return zip_inflate_codes(buff, off, size)
	}
	function zip_inflate_start() {
		var i;
		if (zip_slide == null)
			zip_slide = new Array(2 * zip_WSIZE);
		zip_wp = 0;
		zip_bit_buf = 0;
		zip_bit_len = 0;
		zip_method = -1;
		zip_eof = false;
		zip_copy_leng = zip_copy_dist = 0;
		zip_tl = null
	}
	function zip_inflate_internal(buff, off, size) {
		var n, i;
		n = 0;
		while (n < size) {
			if (zip_eof && zip_method == -1)
				return n;
			if (zip_copy_leng > 0) {
				if (zip_method != zip_STORED_BLOCK)
					while (zip_copy_leng > 0 && n < size) {
						zip_copy_leng--;
						zip_copy_dist &= zip_WSIZE - 1;
						zip_wp &= zip_WSIZE - 1;
						buff[off + n++] = zip_slide[zip_wp++] = zip_slide[zip_copy_dist++]
					}
				else {
					while (zip_copy_leng > 0 && n < size) {
						zip_copy_leng--;
						zip_wp &= zip_WSIZE - 1;
						zip_NEEDBITS(8);
						buff[off + n++] = zip_slide[zip_wp++] = zip_GETBITS(8);
						zip_DUMPBITS(8)
					}
					if (zip_copy_leng == 0)
						zip_method = -1
				}
				if (n == size)
					return n
			}
			if (zip_method == -1) {
				if (zip_eof)
					break;
				zip_NEEDBITS(1);
				if (zip_GETBITS(1) != 0)
					zip_eof = true;
				zip_DUMPBITS(1);
				zip_NEEDBITS(2);
				zip_method = zip_GETBITS(2);
				zip_DUMPBITS(2);
				zip_tl = null;
				zip_copy_leng = 0
			}
			switch (zip_method) {
			case 0:
				i = zip_inflate_stored(buff, off + n, size - n);
				break;
			case 1:
				if (zip_tl != null)
					i = zip_inflate_codes(buff, off + n, size - n);
				else
					i = zip_inflate_fixed(buff, off + n, size - n);
				break;
			case 2:
				if (zip_tl != null)
					i = zip_inflate_codes(buff, off + n, size - n);
				else
					i = zip_inflate_dynamic(buff, off + n, size - n);
				break;
			default:
				i = -1;
				break
			}
			if (i == -1) {
				if (zip_eof)
					return 0;
				return -1
			}
			n += i
		}
		return n
	}
	function zip_inflate(str) {
		var out, buff;
		var i, j;
		zip_inflate_start();
		zip_inflate_data = str;
		zip_inflate_pos = 0;
		buff = new Array(1024);
		out = "";
		while ((i = zip_inflate_internal(buff, 0, buff.length)) > 0)
			for (j = 0; j < i; j++)
				out += String.fromCharCode(buff[j]);
		zip_inflate_data = null;
		return out
	}
	if (!JSZip.compressions["DEFLATE"])
		JSZip.compressions["DEFLATE"] = {
			magic : "\b\x00",
			uncompress : zip_inflate
		};
	else
		JSZip.compressions["DEFLATE"].uncompress = zip_inflate
})();
if (!JSZip)
	throw "JSZip not defined";
(function() {
	var zip_WSIZE = 32768;
	var zip_STORED_BLOCK = 0;
	var zip_STATIC_TREES = 1;
	var zip_DYN_TREES = 2;
	var zip_DEFAULT_LEVEL = 6;
	var zip_FULL_SEARCH = true;
	var zip_INBUFSIZ = 32768;
	var zip_INBUF_EXTRA = 64;
	var zip_OUTBUFSIZ = 1024 * 8;
	var zip_window_size = 2 * zip_WSIZE;
	var zip_MIN_MATCH = 3;
	var zip_MAX_MATCH = 258;
	var zip_BITS = 16;
	var zip_LIT_BUFSIZE = 8192;
	var zip_HASH_BITS = 13;
	if (zip_LIT_BUFSIZE > zip_INBUFSIZ)
		alert("error: zip_INBUFSIZ is too small");
	if (zip_WSIZE << 1 > 1 << zip_BITS)
		alert("error: zip_WSIZE is too large");
	if (zip_HASH_BITS > zip_BITS - 1)
		alert("error: zip_HASH_BITS is too large");
	if (zip_HASH_BITS < 8 || zip_MAX_MATCH != 258)
		alert("error: Code too clever");
	var zip_DIST_BUFSIZE = zip_LIT_BUFSIZE;
	var zip_HASH_SIZE = 1 << zip_HASH_BITS;
	var zip_HASH_MASK = zip_HASH_SIZE - 1;
	var zip_WMASK = zip_WSIZE - 1;
	var zip_NIL = 0;
	var zip_TOO_FAR = 4096;
	var zip_MIN_LOOKAHEAD = zip_MAX_MATCH + zip_MIN_MATCH + 1;
	var zip_MAX_DIST = zip_WSIZE - zip_MIN_LOOKAHEAD;
	var zip_SMALLEST = 1;
	var zip_MAX_BITS = 15;
	var zip_MAX_BL_BITS = 7;
	var zip_LENGTH_CODES = 29;
	var zip_LITERALS = 256;
	var zip_END_BLOCK = 256;
	var zip_L_CODES = zip_LITERALS + 1 + zip_LENGTH_CODES;
	var zip_D_CODES = 30;
	var zip_BL_CODES = 19;
	var zip_REP_3_6 = 16;
	var zip_REPZ_3_10 = 17;
	var zip_REPZ_11_138 = 18;
	var zip_HEAP_SIZE = 2 * zip_L_CODES + 1;
	var zip_H_SHIFT = parseInt((zip_HASH_BITS + zip_MIN_MATCH - 1)
			/ zip_MIN_MATCH);
	var zip_free_queue;
	var zip_qhead, zip_qtail;
	var zip_initflag;
	var zip_outbuf = null;
	var zip_outcnt, zip_outoff;
	var zip_complete;
	var zip_window;
	var zip_d_buf;
	var zip_l_buf;
	var zip_prev;
	var zip_bi_buf;
	var zip_bi_valid;
	var zip_block_start;
	var zip_ins_h;
	var zip_hash_head;
	var zip_prev_match;
	var zip_match_available;
	var zip_match_length;
	var zip_prev_length;
	var zip_strstart;
	var zip_match_start;
	var zip_eofile;
	var zip_lookahead;
	var zip_max_chain_length;
	var zip_max_lazy_match;
	var zip_compr_level;
	var zip_good_match;
	var zip_nice_match;
	var zip_dyn_ltree;
	var zip_dyn_dtree;
	var zip_static_ltree;
	var zip_static_dtree;
	var zip_bl_tree;
	var zip_l_desc;
	var zip_d_desc;
	var zip_bl_desc;
	var zip_bl_count;
	var zip_heap;
	var zip_heap_len;
	var zip_heap_max;
	var zip_depth;
	var zip_length_code;
	var zip_dist_code;
	var zip_base_length;
	var zip_base_dist;
	var zip_flag_buf;
	var zip_last_lit;
	var zip_last_dist;
	var zip_last_flags;
	var zip_flags;
	var zip_flag_bit;
	var zip_opt_len;
	var zip_static_len;
	var zip_deflate_data;
	var zip_deflate_pos;
	var zip_DeflateCT = function() {
		this.fc = 0;
		this.dl = 0
	};
	var zip_DeflateTreeDesc = function() {
		this.dyn_tree = null;
		this.static_tree = null;
		this.extra_bits = null;
		this.extra_base = 0;
		this.elems = 0;
		this.max_length = 0;
		this.max_code = 0
	};
	var zip_DeflateConfiguration = function(a, b, c, d) {
		this.good_length = a;
		this.max_lazy = b;
		this.nice_length = c;
		this.max_chain = d
	};
	var zip_DeflateBuffer = function() {
		this.next = null;
		this.len = 0;
		this.ptr = new Array(zip_OUTBUFSIZ);
		this.off = 0
	};
	var zip_extra_lbits = new Array(0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2,
			2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0);
	var zip_extra_dbits = new Array(0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5,
			6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13);
	var zip_extra_blbits = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 2, 3, 7);
	var zip_bl_order = new Array(16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12,
			3, 13, 2, 14, 1, 15);
	var zip_configuration_table = new Array(new zip_DeflateConfiguration(0, 0,
			0, 0), new zip_DeflateConfiguration(4, 4, 8, 4),
			new zip_DeflateConfiguration(4, 5, 16, 8),
			new zip_DeflateConfiguration(4, 6, 32, 32),
			new zip_DeflateConfiguration(4, 4, 16, 16),
			new zip_DeflateConfiguration(8, 16, 32, 32),
			new zip_DeflateConfiguration(8, 16, 128, 128),
			new zip_DeflateConfiguration(8, 32, 128, 256),
			new zip_DeflateConfiguration(32, 128, 258, 1024),
			new zip_DeflateConfiguration(32, 258, 258, 4096));
	var zip_deflate_start = function(level) {
		var i;
		if (!level)
			level = zip_DEFAULT_LEVEL;
		else if (level < 1)
			level = 1;
		else if (level > 9)
			level = 9;
		zip_compr_level = level;
		zip_initflag = false;
		zip_eofile = false;
		if (zip_outbuf != null)
			return;
		zip_free_queue = zip_qhead = zip_qtail = null;
		zip_outbuf = new Array(zip_OUTBUFSIZ);
		zip_window = new Array(zip_window_size);
		zip_d_buf = new Array(zip_DIST_BUFSIZE);
		zip_l_buf = new Array(zip_INBUFSIZ + zip_INBUF_EXTRA);
		zip_prev = new Array(1 << zip_BITS);
		zip_dyn_ltree = new Array(zip_HEAP_SIZE);
		for (i = 0; i < zip_HEAP_SIZE; i++)
			zip_dyn_ltree[i] = new zip_DeflateCT;
		zip_dyn_dtree = new Array(2 * zip_D_CODES + 1);
		for (i = 0; i < 2 * zip_D_CODES + 1; i++)
			zip_dyn_dtree[i] = new zip_DeflateCT;
		zip_static_ltree = new Array(zip_L_CODES + 2);
		for (i = 0; i < zip_L_CODES + 2; i++)
			zip_static_ltree[i] = new zip_DeflateCT;
		zip_static_dtree = new Array(zip_D_CODES);
		for (i = 0; i < zip_D_CODES; i++)
			zip_static_dtree[i] = new zip_DeflateCT;
		zip_bl_tree = new Array(2 * zip_BL_CODES + 1);
		for (i = 0; i < 2 * zip_BL_CODES + 1; i++)
			zip_bl_tree[i] = new zip_DeflateCT;
		zip_l_desc = new zip_DeflateTreeDesc;
		zip_d_desc = new zip_DeflateTreeDesc;
		zip_bl_desc = new zip_DeflateTreeDesc;
		zip_bl_count = new Array(zip_MAX_BITS + 1);
		zip_heap = new Array(2 * zip_L_CODES + 1);
		zip_depth = new Array(2 * zip_L_CODES + 1);
		zip_length_code = new Array(zip_MAX_MATCH - zip_MIN_MATCH + 1);
		zip_dist_code = new Array(512);
		zip_base_length = new Array(zip_LENGTH_CODES);
		zip_base_dist = new Array(zip_D_CODES);
		zip_flag_buf = new Array(parseInt(zip_LIT_BUFSIZE / 8))
	};
	var zip_deflate_end = function() {
		zip_free_queue = zip_qhead = zip_qtail = null;
		zip_outbuf = null;
		zip_window = null;
		zip_d_buf = null;
		zip_l_buf = null;
		zip_prev = null;
		zip_dyn_ltree = null;
		zip_dyn_dtree = null;
		zip_static_ltree = null;
		zip_static_dtree = null;
		zip_bl_tree = null;
		zip_l_desc = null;
		zip_d_desc = null;
		zip_bl_desc = null;
		zip_bl_count = null;
		zip_heap = null;
		zip_depth = null;
		zip_length_code = null;
		zip_dist_code = null;
		zip_base_length = null;
		zip_base_dist = null;
		zip_flag_buf = null
	};
	var zip_reuse_queue = function(p) {
		p.next = zip_free_queue;
		zip_free_queue = p
	};
	var zip_new_queue = function() {
		var p;
		if (zip_free_queue != null) {
			p = zip_free_queue;
			zip_free_queue = zip_free_queue.next
		} else
			p = new zip_DeflateBuffer;
		p.next = null;
		p.len = p.off = 0;
		return p
	};
	var zip_head1 = function(i) {
		return zip_prev[zip_WSIZE + i]
	};
	var zip_head2 = function(i, val) {
		return zip_prev[zip_WSIZE + i] = val
	};
	var zip_put_byte = function(c) {
		zip_outbuf[zip_outoff + zip_outcnt++] = c;
		if (zip_outoff + zip_outcnt == zip_OUTBUFSIZ)
			zip_qoutbuf()
	};
	var zip_put_short = function(w) {
		w &= 65535;
		if (zip_outoff + zip_outcnt < zip_OUTBUFSIZ - 2) {
			zip_outbuf[zip_outoff + zip_outcnt++] = w & 255;
			zip_outbuf[zip_outoff + zip_outcnt++] = w >>> 8
		} else {
			zip_put_byte(w & 255);
			zip_put_byte(w >>> 8)
		}
	};
	var zip_INSERT_STRING = function() {
		zip_ins_h = (zip_ins_h << zip_H_SHIFT ^ zip_window[zip_strstart
				+ zip_MIN_MATCH - 1] & 255)
				& zip_HASH_MASK;
		zip_hash_head = zip_head1(zip_ins_h);
		zip_prev[zip_strstart & zip_WMASK] = zip_hash_head;
		zip_head2(zip_ins_h, zip_strstart)
	};
	var zip_SEND_CODE = function(c, tree) {
		zip_send_bits(tree[c].fc, tree[c].dl)
	};
	var zip_D_CODE = function(dist) {
		return (dist < 256 ? zip_dist_code[dist]
				: zip_dist_code[256 + (dist >> 7)]) & 255
	};
	var zip_SMALLER = function(tree, n, m) {
		return tree[n].fc < tree[m].fc || tree[n].fc == tree[m].fc
				&& zip_depth[n] <= zip_depth[m]
	};
	var zip_read_buff = function(buff, offset, n) {
		var i;
		for (i = 0; i < n && zip_deflate_pos < zip_deflate_data.length; i++)
			buff[offset + i] = zip_deflate_data.charCodeAt(zip_deflate_pos++) & 255;
		return i
	};
	var zip_lm_init = function() {
		var j;
		for (j = 0; j < zip_HASH_SIZE; j++)
			zip_prev[zip_WSIZE + j] = 0;
		zip_max_lazy_match = zip_configuration_table[zip_compr_level].max_lazy;
		zip_good_match = zip_configuration_table[zip_compr_level].good_length;
		if (!zip_FULL_SEARCH)
			zip_nice_match = zip_configuration_table[zip_compr_level].nice_length;
		zip_max_chain_length = zip_configuration_table[zip_compr_level].max_chain;
		zip_strstart = 0;
		zip_block_start = 0;
		zip_lookahead = zip_read_buff(zip_window, 0, 2 * zip_WSIZE);
		if (zip_lookahead <= 0) {
			zip_eofile = true;
			zip_lookahead = 0;
			return
		}
		zip_eofile = false;
		while (zip_lookahead < zip_MIN_LOOKAHEAD && !zip_eofile)
			zip_fill_window();
		zip_ins_h = 0;
		for (j = 0; j < zip_MIN_MATCH - 1; j++)
			zip_ins_h = (zip_ins_h << zip_H_SHIFT ^ zip_window[j] & 255)
					& zip_HASH_MASK
	};
	var zip_longest_match = function(cur_match) {
		var chain_length = zip_max_chain_length;
		var scanp = zip_strstart;
		var matchp;
		var len;
		var best_len = zip_prev_length;
		var limit = zip_strstart > zip_MAX_DIST ? zip_strstart - zip_MAX_DIST
				: zip_NIL;
		var strendp = zip_strstart + zip_MAX_MATCH;
		var scan_end1 = zip_window[scanp + best_len - 1];
		var scan_end = zip_window[scanp + best_len];
		if (zip_prev_length >= zip_good_match)
			chain_length >>= 2;
		do {
			matchp = cur_match;
			if (zip_window[matchp + best_len] != scan_end
					|| zip_window[matchp + best_len - 1] != scan_end1
					|| zip_window[matchp] != zip_window[scanp]
					|| zip_window[++matchp] != zip_window[scanp + 1])
				continue;
			scanp += 2;
			matchp++;
			do
				; while (zip_window[++scanp] == zip_window[++matchp]
					&& zip_window[++scanp] == zip_window[++matchp]
					&& zip_window[++scanp] == zip_window[++matchp]
					&& zip_window[++scanp] == zip_window[++matchp]
					&& zip_window[++scanp] == zip_window[++matchp]
					&& zip_window[++scanp] == zip_window[++matchp]
					&& zip_window[++scanp] == zip_window[++matchp]
					&& zip_window[++scanp] == zip_window[++matchp]
					&& scanp < strendp);
			len = zip_MAX_MATCH - (strendp - scanp);
			scanp = strendp - zip_MAX_MATCH;
			if (len > best_len) {
				zip_match_start = cur_match;
				best_len = len;
				if (zip_FULL_SEARCH) {
					if (len >= zip_MAX_MATCH)
						break
				} else if (len >= zip_nice_match)
					break;
				scan_end1 = zip_window[scanp + best_len - 1];
				scan_end = zip_window[scanp + best_len]
			}
		} while ((cur_match = zip_prev[cur_match & zip_WMASK]) > limit
				&& --chain_length != 0);
		return best_len
	};
	var zip_fill_window = function() {
		var n, m;
		var more = zip_window_size - zip_lookahead - zip_strstart;
		if (more == -1)
			more--;
		else if (zip_strstart >= zip_WSIZE + zip_MAX_DIST) {
			for (n = 0; n < zip_WSIZE; n++)
				zip_window[n] = zip_window[n + zip_WSIZE];
			zip_match_start -= zip_WSIZE;
			zip_strstart -= zip_WSIZE;
			zip_block_start -= zip_WSIZE;
			for (n = 0; n < zip_HASH_SIZE; n++) {
				m = zip_head1(n);
				zip_head2(n, m >= zip_WSIZE ? m - zip_WSIZE : zip_NIL)
			}
			for (n = 0; n < zip_WSIZE; n++) {
				m = zip_prev[n];
				zip_prev[n] = m >= zip_WSIZE ? m - zip_WSIZE : zip_NIL
			}
			more += zip_WSIZE
		}
		if (!zip_eofile) {
			n = zip_read_buff(zip_window, zip_strstart + zip_lookahead, more);
			if (n <= 0)
				zip_eofile = true;
			else
				zip_lookahead += n
		}
	};
	var zip_deflate_fast = function() {
		while (zip_lookahead != 0 && zip_qhead == null) {
			var flush;
			zip_INSERT_STRING();
			if (zip_hash_head != zip_NIL
					&& zip_strstart - zip_hash_head <= zip_MAX_DIST) {
				zip_match_length = zip_longest_match(zip_hash_head);
				if (zip_match_length > zip_lookahead)
					zip_match_length = zip_lookahead
			}
			if (zip_match_length >= zip_MIN_MATCH) {
				flush = zip_ct_tally(zip_strstart - zip_match_start,
						zip_match_length - zip_MIN_MATCH);
				zip_lookahead -= zip_match_length;
				if (zip_match_length <= zip_max_lazy_match) {
					zip_match_length--;
					do {
						zip_strstart++;
						zip_INSERT_STRING()
					} while (--zip_match_length != 0);
					zip_strstart++
				} else {
					zip_strstart += zip_match_length;
					zip_match_length = 0;
					zip_ins_h = zip_window[zip_strstart] & 255;
					zip_ins_h = (zip_ins_h << zip_H_SHIFT ^ zip_window[zip_strstart + 1] & 255)
							& zip_HASH_MASK
				}
			} else {
				flush = zip_ct_tally(0, zip_window[zip_strstart] & 255);
				zip_lookahead--;
				zip_strstart++
			}
			if (flush) {
				zip_flush_block(0);
				zip_block_start = zip_strstart
			}
			while (zip_lookahead < zip_MIN_LOOKAHEAD && !zip_eofile)
				zip_fill_window()
		}
	};
	var zip_deflate_better = function() {
		while (zip_lookahead != 0 && zip_qhead == null) {
			zip_INSERT_STRING();
			zip_prev_length = zip_match_length;
			zip_prev_match = zip_match_start;
			zip_match_length = zip_MIN_MATCH - 1;
			if (zip_hash_head != zip_NIL
					&& zip_prev_length < zip_max_lazy_match
					&& zip_strstart - zip_hash_head <= zip_MAX_DIST) {
				zip_match_length = zip_longest_match(zip_hash_head);
				if (zip_match_length > zip_lookahead)
					zip_match_length = zip_lookahead;
				if (zip_match_length == zip_MIN_MATCH
						&& zip_strstart - zip_match_start > zip_TOO_FAR)
					zip_match_length--
			}
			if (zip_prev_length >= zip_MIN_MATCH
					&& zip_match_length <= zip_prev_length) {
				var flush;
				flush = zip_ct_tally(zip_strstart - 1 - zip_prev_match,
						zip_prev_length - zip_MIN_MATCH);
				zip_lookahead -= zip_prev_length - 1;
				zip_prev_length -= 2;
				do {
					zip_strstart++;
					zip_INSERT_STRING()
				} while (--zip_prev_length != 0);
				zip_match_available = 0;
				zip_match_length = zip_MIN_MATCH - 1;
				zip_strstart++;
				if (flush) {
					zip_flush_block(0);
					zip_block_start = zip_strstart
				}
			} else if (zip_match_available != 0) {
				if (zip_ct_tally(0, zip_window[zip_strstart - 1] & 255)) {
					zip_flush_block(0);
					zip_block_start = zip_strstart
				}
				zip_strstart++;
				zip_lookahead--
			} else {
				zip_match_available = 1;
				zip_strstart++;
				zip_lookahead--
			}
			while (zip_lookahead < zip_MIN_LOOKAHEAD && !zip_eofile)
				zip_fill_window()
		}
	};
	var zip_init_deflate = function() {
		if (zip_eofile)
			return;
		zip_bi_buf = 0;
		zip_bi_valid = 0;
		zip_ct_init();
		zip_lm_init();
		zip_qhead = null;
		zip_outcnt = 0;
		zip_outoff = 0;
		if (zip_compr_level <= 3) {
			zip_prev_length = zip_MIN_MATCH - 1;
			zip_match_length = 0
		} else {
			zip_match_length = zip_MIN_MATCH - 1;
			zip_match_available = 0
		}
		zip_complete = false
	};
	var zip_deflate_internal = function(buff, off, buff_size) {
		var n;
		if (!zip_initflag) {
			zip_init_deflate();
			zip_initflag = true;
			if (zip_lookahead == 0) {
				zip_complete = true;
				return 0
			}
		}
		if ((n = zip_qcopy(buff, off, buff_size)) == buff_size)
			return buff_size;
		if (zip_complete)
			return n;
		if (zip_compr_level <= 3)
			zip_deflate_fast();
		else
			zip_deflate_better();
		if (zip_lookahead == 0) {
			if (zip_match_available != 0)
				zip_ct_tally(0, zip_window[zip_strstart - 1] & 255);
			zip_flush_block(1);
			zip_complete = true
		}
		return n + zip_qcopy(buff, n + off, buff_size - n)
	};
	var zip_qcopy = function(buff, off, buff_size) {
		var n, i, j;
		n = 0;
		while (zip_qhead != null && n < buff_size) {
			i = buff_size - n;
			if (i > zip_qhead.len)
				i = zip_qhead.len;
			for (j = 0; j < i; j++)
				buff[off + n + j] = zip_qhead.ptr[zip_qhead.off + j];
			zip_qhead.off += i;
			zip_qhead.len -= i;
			n += i;
			if (zip_qhead.len == 0) {
				var p;
				p = zip_qhead;
				zip_qhead = zip_qhead.next;
				zip_reuse_queue(p)
			}
		}
		if (n == buff_size)
			return n;
		if (zip_outoff < zip_outcnt) {
			i = buff_size - n;
			if (i > zip_outcnt - zip_outoff)
				i = zip_outcnt - zip_outoff;
			for (j = 0; j < i; j++)
				buff[off + n + j] = zip_outbuf[zip_outoff + j];
			zip_outoff += i;
			n += i;
			if (zip_outcnt == zip_outoff)
				zip_outcnt = zip_outoff = 0
		}
		return n
	};
	var zip_ct_init = function() {
		var n;
		var bits;
		var length;
		var code;
		var dist;
		if (zip_static_dtree[0].dl != 0)
			return;
		zip_l_desc.dyn_tree = zip_dyn_ltree;
		zip_l_desc.static_tree = zip_static_ltree;
		zip_l_desc.extra_bits = zip_extra_lbits;
		zip_l_desc.extra_base = zip_LITERALS + 1;
		zip_l_desc.elems = zip_L_CODES;
		zip_l_desc.max_length = zip_MAX_BITS;
		zip_l_desc.max_code = 0;
		zip_d_desc.dyn_tree = zip_dyn_dtree;
		zip_d_desc.static_tree = zip_static_dtree;
		zip_d_desc.extra_bits = zip_extra_dbits;
		zip_d_desc.extra_base = 0;
		zip_d_desc.elems = zip_D_CODES;
		zip_d_desc.max_length = zip_MAX_BITS;
		zip_d_desc.max_code = 0;
		zip_bl_desc.dyn_tree = zip_bl_tree;
		zip_bl_desc.static_tree = null;
		zip_bl_desc.extra_bits = zip_extra_blbits;
		zip_bl_desc.extra_base = 0;
		zip_bl_desc.elems = zip_BL_CODES;
		zip_bl_desc.max_length = zip_MAX_BL_BITS;
		zip_bl_desc.max_code = 0;
		length = 0;
		for (code = 0; code < zip_LENGTH_CODES - 1; code++) {
			zip_base_length[code] = length;
			for (n = 0; n < 1 << zip_extra_lbits[code]; n++)
				zip_length_code[length++] = code
		}
		zip_length_code[length - 1] = code;
		dist = 0;
		for (code = 0; code < 16; code++) {
			zip_base_dist[code] = dist;
			for (n = 0; n < 1 << zip_extra_dbits[code]; n++)
				zip_dist_code[dist++] = code
		}
		dist >>= 7;
		for (; code < zip_D_CODES; code++) {
			zip_base_dist[code] = dist << 7;
			for (n = 0; n < 1 << zip_extra_dbits[code] - 7; n++)
				zip_dist_code[256 + dist++] = code
		}
		for (bits = 0; bits <= zip_MAX_BITS; bits++)
			zip_bl_count[bits] = 0;
		n = 0;
		while (n <= 143) {
			zip_static_ltree[n++].dl = 8;
			zip_bl_count[8]++
		}
		while (n <= 255) {
			zip_static_ltree[n++].dl = 9;
			zip_bl_count[9]++
		}
		while (n <= 279) {
			zip_static_ltree[n++].dl = 7;
			zip_bl_count[7]++
		}
		while (n <= 287) {
			zip_static_ltree[n++].dl = 8;
			zip_bl_count[8]++
		}
		zip_gen_codes(zip_static_ltree, zip_L_CODES + 1);
		for (n = 0; n < zip_D_CODES; n++) {
			zip_static_dtree[n].dl = 5;
			zip_static_dtree[n].fc = zip_bi_reverse(n, 5)
		}
		zip_init_block()
	};
	var zip_init_block = function() {
		var n;
		for (n = 0; n < zip_L_CODES; n++)
			zip_dyn_ltree[n].fc = 0;
		for (n = 0; n < zip_D_CODES; n++)
			zip_dyn_dtree[n].fc = 0;
		for (n = 0; n < zip_BL_CODES; n++)
			zip_bl_tree[n].fc = 0;
		zip_dyn_ltree[zip_END_BLOCK].fc = 1;
		zip_opt_len = zip_static_len = 0;
		zip_last_lit = zip_last_dist = zip_last_flags = 0;
		zip_flags = 0;
		zip_flag_bit = 1
	};
	var zip_pqdownheap = function(tree, k) {
		var v = zip_heap[k];
		var j = k << 1;
		while (j <= zip_heap_len) {
			if (j < zip_heap_len
					&& zip_SMALLER(tree, zip_heap[j + 1], zip_heap[j]))
				j++;
			if (zip_SMALLER(tree, v, zip_heap[j]))
				break;
			zip_heap[k] = zip_heap[j];
			k = j;
			j <<= 1
		}
		zip_heap[k] = v
	};
	var zip_gen_bitlen = function(desc) {
		var tree = desc.dyn_tree;
		var extra = desc.extra_bits;
		var base = desc.extra_base;
		var max_code = desc.max_code;
		var max_length = desc.max_length;
		var stree = desc.static_tree;
		var h;
		var n, m;
		var bits;
		var xbits;
		var f;
		var overflow = 0;
		for (bits = 0; bits <= zip_MAX_BITS; bits++)
			zip_bl_count[bits] = 0;
		tree[zip_heap[zip_heap_max]].dl = 0;
		for (h = zip_heap_max + 1; h < zip_HEAP_SIZE; h++) {
			n = zip_heap[h];
			bits = tree[tree[n].dl].dl + 1;
			if (bits > max_length) {
				bits = max_length;
				overflow++
			}
			tree[n].dl = bits;
			if (n > max_code)
				continue;
			zip_bl_count[bits]++;
			xbits = 0;
			if (n >= base)
				xbits = extra[n - base];
			f = tree[n].fc;
			zip_opt_len += f * (bits + xbits);
			if (stree != null)
				zip_static_len += f * (stree[n].dl + xbits)
		}
		if (overflow == 0)
			return;
		do {
			bits = max_length - 1;
			while (zip_bl_count[bits] == 0)
				bits--;
			zip_bl_count[bits]--;
			zip_bl_count[bits + 1] += 2;
			zip_bl_count[max_length]--;
			overflow -= 2
		} while (overflow > 0);
		for (bits = max_length; bits != 0; bits--) {
			n = zip_bl_count[bits];
			while (n != 0) {
				m = zip_heap[--h];
				if (m > max_code)
					continue;
				if (tree[m].dl != bits) {
					zip_opt_len += (bits - tree[m].dl) * tree[m].fc;
					tree[m].fc = bits
				}
				n--
			}
		}
	};
	var zip_gen_codes = function(tree, max_code) {
		var next_code = new Array(zip_MAX_BITS + 1);
		var code = 0;
		var bits;
		var n;
		for (bits = 1; bits <= zip_MAX_BITS; bits++) {
			code = code + zip_bl_count[bits - 1] << 1;
			next_code[bits] = code
		}
		for (n = 0; n <= max_code; n++) {
			var len = tree[n].dl;
			if (len == 0)
				continue;
			tree[n].fc = zip_bi_reverse(next_code[len]++, len)
		}
	};
	var zip_build_tree = function(desc) {
		var tree = desc.dyn_tree;
		var stree = desc.static_tree;
		var elems = desc.elems;
		var n, m;
		var max_code = -1;
		var node = elems;
		zip_heap_len = 0;
		zip_heap_max = zip_HEAP_SIZE;
		for (n = 0; n < elems; n++)
			if (tree[n].fc != 0) {
				zip_heap[++zip_heap_len] = max_code = n;
				zip_depth[n] = 0
			} else
				tree[n].dl = 0;
		while (zip_heap_len < 2) {
			var xnew = zip_heap[++zip_heap_len] = max_code < 2 ? ++max_code : 0;
			tree[xnew].fc = 1;
			zip_depth[xnew] = 0;
			zip_opt_len--;
			if (stree != null)
				zip_static_len -= stree[xnew].dl
		}
		desc.max_code = max_code;
		for (n = zip_heap_len >> 1; n >= 1; n--)
			zip_pqdownheap(tree, n);
		do {
			n = zip_heap[zip_SMALLEST];
			zip_heap[zip_SMALLEST] = zip_heap[zip_heap_len--];
			zip_pqdownheap(tree, zip_SMALLEST);
			m = zip_heap[zip_SMALLEST];
			zip_heap[--zip_heap_max] = n;
			zip_heap[--zip_heap_max] = m;
			tree[node].fc = tree[n].fc + tree[m].fc;
			if (zip_depth[n] > zip_depth[m] + 1)
				zip_depth[node] = zip_depth[n];
			else
				zip_depth[node] = zip_depth[m] + 1;
			tree[n].dl = tree[m].dl = node;
			zip_heap[zip_SMALLEST] = node++;
			zip_pqdownheap(tree, zip_SMALLEST)
		} while (zip_heap_len >= 2);
		zip_heap[--zip_heap_max] = zip_heap[zip_SMALLEST];
		zip_gen_bitlen(desc);
		zip_gen_codes(tree, max_code)
	};
	var zip_scan_tree = function(tree, max_code) {
		var n;
		var prevlen = -1;
		var curlen;
		var nextlen = tree[0].dl;
		var count = 0;
		var max_count = 7;
		var min_count = 4;
		if (nextlen == 0) {
			max_count = 138;
			min_count = 3
		}
		tree[max_code + 1].dl = 65535;
		for (n = 0; n <= max_code; n++) {
			curlen = nextlen;
			nextlen = tree[n + 1].dl;
			if (++count < max_count && curlen == nextlen)
				continue;
			else if (count < min_count)
				zip_bl_tree[curlen].fc += count;
			else if (curlen != 0) {
				if (curlen != prevlen)
					zip_bl_tree[curlen].fc++;
				zip_bl_tree[zip_REP_3_6].fc++
			} else if (count <= 10)
				zip_bl_tree[zip_REPZ_3_10].fc++;
			else
				zip_bl_tree[zip_REPZ_11_138].fc++;
			count = 0;
			prevlen = curlen;
			if (nextlen == 0) {
				max_count = 138;
				min_count = 3
			} else if (curlen == nextlen) {
				max_count = 6;
				min_count = 3
			} else {
				max_count = 7;
				min_count = 4
			}
		}
	};
	var zip_send_tree = function(tree, max_code) {
		var n;
		var prevlen = -1;
		var curlen;
		var nextlen = tree[0].dl;
		var count = 0;
		var max_count = 7;
		var min_count = 4;
		if (nextlen == 0) {
			max_count = 138;
			min_count = 3
		}
		for (n = 0; n <= max_code; n++) {
			curlen = nextlen;
			nextlen = tree[n + 1].dl;
			if (++count < max_count && curlen == nextlen)
				continue;
			else if (count < min_count) {
				do
					zip_SEND_CODE(curlen, zip_bl_tree);
				while (--count != 0)
			} else if (curlen != 0) {
				if (curlen != prevlen) {
					zip_SEND_CODE(curlen, zip_bl_tree);
					count--
				}
				zip_SEND_CODE(zip_REP_3_6, zip_bl_tree);
				zip_send_bits(count - 3, 2)
			} else if (count <= 10) {
				zip_SEND_CODE(zip_REPZ_3_10, zip_bl_tree);
				zip_send_bits(count - 3, 3)
			} else {
				zip_SEND_CODE(zip_REPZ_11_138, zip_bl_tree);
				zip_send_bits(count - 11, 7)
			}
			count = 0;
			prevlen = curlen;
			if (nextlen == 0) {
				max_count = 138;
				min_count = 3
			} else if (curlen == nextlen) {
				max_count = 6;
				min_count = 3
			} else {
				max_count = 7;
				min_count = 4
			}
		}
	};
	var zip_build_bl_tree = function() {
		var max_blindex;
		zip_scan_tree(zip_dyn_ltree, zip_l_desc.max_code);
		zip_scan_tree(zip_dyn_dtree, zip_d_desc.max_code);
		zip_build_tree(zip_bl_desc);
		for (max_blindex = zip_BL_CODES - 1; max_blindex >= 3; max_blindex--)
			if (zip_bl_tree[zip_bl_order[max_blindex]].dl != 0)
				break;
		zip_opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
		return max_blindex
	};
	var zip_send_all_trees = function(lcodes, dcodes, blcodes) {
		var rank;
		zip_send_bits(lcodes - 257, 5);
		zip_send_bits(dcodes - 1, 5);
		zip_send_bits(blcodes - 4, 4);
		for (rank = 0; rank < blcodes; rank++)
			zip_send_bits(zip_bl_tree[zip_bl_order[rank]].dl, 3);
		zip_send_tree(zip_dyn_ltree, lcodes - 1);
		zip_send_tree(zip_dyn_dtree, dcodes - 1)
	};
	var zip_flush_block = function(eof) {
		var opt_lenb, static_lenb;
		var max_blindex;
		var stored_len;
		stored_len = zip_strstart - zip_block_start;
		zip_flag_buf[zip_last_flags] = zip_flags;
		zip_build_tree(zip_l_desc);
		zip_build_tree(zip_d_desc);
		max_blindex = zip_build_bl_tree();
		opt_lenb = zip_opt_len + 3 + 7 >> 3;
		static_lenb = zip_static_len + 3 + 7 >> 3;
		if (static_lenb <= opt_lenb)
			opt_lenb = static_lenb;
		if (stored_len + 4 <= opt_lenb && zip_block_start >= 0) {
			var i;
			zip_send_bits((zip_STORED_BLOCK << 1) + eof, 3);
			zip_bi_windup();
			zip_put_short(stored_len);
			zip_put_short(~stored_len);
			for (i = 0; i < stored_len; i++)
				zip_put_byte(zip_window[zip_block_start + i])
		} else if (static_lenb == opt_lenb) {
			zip_send_bits((zip_STATIC_TREES << 1) + eof, 3);
			zip_compress_block(zip_static_ltree, zip_static_dtree)
		} else {
			zip_send_bits((zip_DYN_TREES << 1) + eof, 3);
			zip_send_all_trees(zip_l_desc.max_code + 1,
					zip_d_desc.max_code + 1, max_blindex + 1);
			zip_compress_block(zip_dyn_ltree, zip_dyn_dtree)
		}
		zip_init_block();
		if (eof != 0)
			zip_bi_windup()
	};
	var zip_ct_tally = function(dist, lc) {
		zip_l_buf[zip_last_lit++] = lc;
		if (dist == 0)
			zip_dyn_ltree[lc].fc++;
		else {
			dist--;
			zip_dyn_ltree[zip_length_code[lc] + zip_LITERALS + 1].fc++;
			zip_dyn_dtree[zip_D_CODE(dist)].fc++;
			zip_d_buf[zip_last_dist++] = dist;
			zip_flags |= zip_flag_bit
		}
		zip_flag_bit <<= 1;
		if ((zip_last_lit & 7) == 0) {
			zip_flag_buf[zip_last_flags++] = zip_flags;
			zip_flags = 0;
			zip_flag_bit = 1
		}
		if (zip_compr_level > 2 && (zip_last_lit & 4095) == 0) {
			var out_length = zip_last_lit * 8;
			var in_length = zip_strstart - zip_block_start;
			var dcode;
			for (dcode = 0; dcode < zip_D_CODES; dcode++)
				out_length += zip_dyn_dtree[dcode].fc
						* (5 + zip_extra_dbits[dcode]);
			out_length >>= 3;
			if (zip_last_dist < parseInt(zip_last_lit / 2)
					&& out_length < parseInt(in_length / 2))
				return true
		}
		return zip_last_lit == zip_LIT_BUFSIZE - 1
				|| zip_last_dist == zip_DIST_BUFSIZE
	};
	var zip_compress_block = function(ltree, dtree) {
		var dist;
		var lc;
		var lx = 0;
		var dx = 0;
		var fx = 0;
		var flag = 0;
		var code;
		var extra;
		if (zip_last_lit != 0) {
			do {
				if ((lx & 7) == 0)
					flag = zip_flag_buf[fx++];
				lc = zip_l_buf[lx++] & 255;
				if ((flag & 1) == 0)
					zip_SEND_CODE(lc, ltree);
				else {
					code = zip_length_code[lc];
					zip_SEND_CODE(code + zip_LITERALS + 1, ltree);
					extra = zip_extra_lbits[code];
					if (extra != 0) {
						lc -= zip_base_length[code];
						zip_send_bits(lc, extra)
					}
					dist = zip_d_buf[dx++];
					code = zip_D_CODE(dist);
					zip_SEND_CODE(code, dtree);
					extra = zip_extra_dbits[code];
					if (extra != 0) {
						dist -= zip_base_dist[code];
						zip_send_bits(dist, extra)
					}
				}
				flag >>= 1
			} while (lx < zip_last_lit)
		}
		zip_SEND_CODE(zip_END_BLOCK, ltree)
	};
	var zip_Buf_size = 16;
	var zip_send_bits = function(value, length) {
		if (zip_bi_valid > zip_Buf_size - length) {
			zip_bi_buf |= value << zip_bi_valid;
			zip_put_short(zip_bi_buf);
			zip_bi_buf = value >> zip_Buf_size - zip_bi_valid;
			zip_bi_valid += length - zip_Buf_size
		} else {
			zip_bi_buf |= value << zip_bi_valid;
			zip_bi_valid += length
		}
	};
	var zip_bi_reverse = function(code, len) {
		var res = 0;
		do {
			res |= code & 1;
			code >>= 1;
			res <<= 1
		} while (--len > 0);
		return res >> 1
	};
	var zip_bi_windup = function() {
		if (zip_bi_valid > 8)
			zip_put_short(zip_bi_buf);
		else if (zip_bi_valid > 0)
			zip_put_byte(zip_bi_buf);
		zip_bi_buf = 0;
		zip_bi_valid = 0
	};
	var zip_qoutbuf = function() {
		if (zip_outcnt != 0) {
			var q, i;
			q = zip_new_queue();
			if (zip_qhead == null)
				zip_qhead = zip_qtail = q;
			else
				zip_qtail = zip_qtail.next = q;
			q.len = zip_outcnt - zip_outoff;
			for (i = 0; i < q.len; i++)
				q.ptr[i] = zip_outbuf[zip_outoff + i];
			zip_outcnt = zip_outoff = 0
		}
	};
	var zip_deflate = function(str, level) {
		var i, j;
		zip_deflate_data = str;
		zip_deflate_pos = 0;
		if (typeof level == "undefined")
			level = zip_DEFAULT_LEVEL;
		zip_deflate_start(level);
		var buff = new Array(1024);
		var aout = [];
		while ((i = zip_deflate_internal(buff, 0, buff.length)) > 0) {
			var cbuf = new Array(i);
			for (j = 0; j < i; j++)
				cbuf[j] = String.fromCharCode(buff[j]);
			aout[aout.length] = cbuf.join("")
		}
		zip_deflate_data = null;
		return aout.join("")
	};
	if (!JSZip.compressions["DEFLATE"])
		JSZip.compressions["DEFLATE"] = {
			magic : "\b\x00",
			compress : zip_deflate
		};
	else
		JSZip.compressions["DEFLATE"].compress = zip_deflate
})();
