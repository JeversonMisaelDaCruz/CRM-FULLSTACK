import { Auth } from "../Auth";
import { Leads } from "../Leads";
import { Pipeline } from "../Pipeline";
import { PipelinePhase } from "../PipelinePhase";

class API {
  static auth = new Auth();
  static leads = new Leads();
  static PipelinePhase = new PipelinePhase();
  static pipeline = new Pipeline();
}

export default API;
