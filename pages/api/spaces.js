import axios from "axios";

export default async function spaces(req, res) {
  try {
    const { query, state } = req.body;
    console.log(req.body);

    var config = {
      method: "get",
      url: `https://api.twitter.com/2/spaces/search?query=${query}&state=${state}&space.fields=created_at,creator_id,host_ids,id,invited_user_ids,participant_count,scheduled_start,speaker_ids,started_at,title,topic_ids&expansions=invited_user_ids,speaker_ids,creator_id,host_ids&user.fields=description,id,name,profile_image_url,protected,username,verified&topic.fields=id,name,description`,
      headers: {
        Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios(config);
    res.json(response.data);
  } catch (error) {
    console.log(error);
  }
}
