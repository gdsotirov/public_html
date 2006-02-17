<?php
/* Class       : CAgregator
 * Purpose     : Agregate content from external sources.
 */
abstract class CAgregator {
  protected $parser = null;
  protected $URL = "";

  public function __construct($url) {
    $this->URL = $url;
  }
  abstract public function agregate();
}

/* Class       : CAgregateAtom
 * Purpose     : Agregate content in Atom format.
 */
class CAgregateBlog extends CAgregator {
  protected $output = false;
  protected $depth = 0;
  protected $format = "raw";
  protected $map_array = array(
     "2ENTRY" => "",
     "2ISSUED" => "i",
     "2LINK" => "",
     "2TITLE" => ""
  );

  private function startElement($parser, $name, $attrs) {
    switch ($name) {
      case "FEED":
      case "ENTRY":
      case "AUTHOR": $this->depth += 1; break;
      case "ISSUED": $this->format = "date"; break;
      default: break;
    }

    $key = $this->depth."$name";
    switch ($key) {
      case "2LINK": if ( isset($attrs["REL"]) ) {
                      $rel = $attrs["REL"];
                      if ( $rel == "alternate" )
                        echo "<a href=\"".$attrs["HREF"]."\">";
                    }
                    break;
      default: if (isset($this->map_array[$key])) {
                 $this->output = true;
                 $tag = $this->map_array[$key];
                 if ($tag != "")
                   echo "<$tag>";
               }
               else
                   $this->output = false;
               break;
    }
  }

  private function endElement($parser, $name) {
    switch ($name) {
      case "FEED":
      case "ENTRY":
      case "AUTHOR": $this->depth -= 1; break;
      case "ISSUED": $this->format = "raw"; break;
      default: break;
    }

    $key = $this->depth."$name";
    switch ($key) {
      case "2TITLE": echo "</a><br />\n";
      default: if (isset($this->map_array[$key])) {
                 $this->output = true;
                 $tag = $this->map_array[$key];
                 if ($tag != "")
                   echo "</$tag>";
               }
               else
                 $this->output = false;
               break;
    }
  }

  private function characterData($parser, $data) {
    if ($this->output) {
      switch ($this->format) {
        case "date": echo date("Y-m-d H:i", strtotime($data)); break;
        default: echo $data;
      }
    }
  }

  public function agregate() {
    $this->parser = xml_parser_create();
    xml_set_object($this->parser, $this);
    xml_parser_set_option($this->parser, XML_OPTION_CASE_FOLDING, true);
    xml_set_element_handler($this->parser, "startElement", "endElement");
    xml_set_character_data_handler($this->parser, "characterData");

    if (!($fp = fopen($this->URL, "r"))) {
      print("Could not access content now.");
      return -1;
    }

    while ($data = fread($fp, 4096)) {
      if (!xml_parse($this->parser, $data, feof($fp))) {
        sprintf("XML error: %s at line %d",
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
