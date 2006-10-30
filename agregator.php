<?php
/* Class       : CAgregator
 * Purpose     : Agregate content from external sources.
 */
abstract class CAgregator {
  protected $max_cnt = 10;
  protected $parser = null;
  protected $URL = "";
  protected $LANG = "en";

  public function __construct($url, $max_cnt) {
    $this->URL = $url;
    $this->max_cnt = $max_cnt;
  }
  public function setLang($lang) {
    $this->LANG = $lang;
  }
  abstract public function agregate();
}

/* Class       : CAgregateAtom
 * Purpose     : Agregate content in Atom format.
 */
class CAgregateBlog extends CAgregator {
  private $cnt = 1; /* items count */
  private $collect = 'no';
  private $title = "";
  private $href = "";
  private $published = "";
  protected $output = false;
  protected $depth = 0;
  protected $format = "raw";

  private function getInterMsg($id) {
    if ( $this->LANG == "en" ) {
      switch ($id) {
        case 'not_accessible' : return "Could not access content right now.";
        case 'xml_error'      : return "XML error: %s at line %d";
        default               : return "";
      }
    }
    else {/* if LANG == "bg" */
      switch ($id) {
        case 'not_accessible' : return "В момента няма достъп до съдържанието.";
        case 'xml_error'      : return "XML грешка: %s на ред %d";
        default               : return "";
      }
    }
  }

  private function startElement($parser, $name, $attrs) {
    switch ($name) {
      case "FEED":
      case "ENTRY":
      case "AUTHOR": $this->depth += 1; break;
      default: break;
    }

    $key = $this->depth."$name";
    switch ($key) {
      case "2TITLE": $this->collect = 'title'; break;
      case "2LINK": if ( isset($attrs["REL"]) ) {
                      if ( $attrs["REL"] == "alternate" )
                        $this->href = $attrs["HREF"];
                    }
                    break;
      case "2PUBLISHED": $this->collect = 'published'; break;
      default: break;
    }
  }

  private function endElement($parser, $name) {
    switch ($name) {
      case "FEED":
      case "ENTRY":
      case "AUTHOR": $this->depth -= 1; break;
      default: break;
    }

    $key = $this->depth."$name";
    switch ($key) {
      case "2TITLE":
      case "2LINK":
      case "2PUBLISHED": $this->collect = 'no'; break;
      case "1ENTRY": if ( $this->cnt <= $this->max_cnt ) {
                       echo "<i>".$this->published."</i> - ";
                       echo "<a href=\"".$this->href."\">";
                       echo $this->title."</a><br />\n";
                       $this->cnt++;
                     }
                     break;
      default: break;
    }
  }

  private function characterData($parser, $data) {
    switch ($this->collect) {
      case 'title': $this->title = $data; break;
      case 'published': $this->published = date("Y-m-d H:i", strtotime($data));
      default: break;
    }
  }

  public function agregate() {
    $this->parser = xml_parser_create();
    xml_set_object($this->parser, $this);
    xml_parser_set_option($this->parser, XML_OPTION_CASE_FOLDING, true);
    xml_set_element_handler($this->parser, "startElement", "endElement");
    xml_set_character_data_handler($this->parser, "characterData");

    if (!($fp = fopen($this->URL, "r"))) {
      print($this->getInterMsg('not_accessible'));
      return -1;
    }

    while ($data = fread($fp, 4096)) {
      if (!xml_parse($this->parser, $data, feof($fp))) {
        sprintf($this->getInterMsg('xml_error'),
                xml_error_string(xml_get_error_code($this->parser)),
                xml_get_current_line_number($this->parser));
        return -1;
      }
    }

    fclose($fp);
    xml_parser_free($this->parser);

    return 0;
  }
}
?>
