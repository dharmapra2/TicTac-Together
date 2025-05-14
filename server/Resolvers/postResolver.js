import axios from "axios";

async function fetchApiData(url) {
  const apiResponse = await axios.get(
    `https://jsonplaceholder.typicode.com/${url}`
  );
  console.log("Request sent to the API");
  return apiResponse.data;
}

async function postApiData(url, body) {
  return await axios
    .post(`https://jsonplaceholder.typicode.com/${url}`, JSON.stringify(body))
    .then((response) => response.data)
    .catch((error) => {
      return { status: false, message: error?.message };
    });
}

export const getpostsData = async (_parent, { postId }, _context, _info) => {
  try {
    const results = await fetchApiData(`posts/${postId}`);

    return {
      data: [results],
      status: true,
      message: "Data fetched successfully",
    };
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
};
export const getAllPostsData = async (_parent, {}, _context, _info) => {
  try {
    const results = await fetchApiData(`posts`);
    return {
      data: results,
      status: true,
      message: "Data fetched successfully",
    };
  } catch (error) {
    return {
      status: false,
      message: error?.message,
    };
  }
};

export const putpostsData = async (_parent, { args }, _context, _info) => {
  // const { params, body } = req;
  // const postId = params?.postId;
  let results;
  // try {
  return [];
  //   body["id"] = postId;
  //   results = await postApiData(postId, body);
  //   console.log("\nresults==", !results ? false : true, typeof results);

  //   if (!results) {
  //     res.status(404).json({ message: "Something .." });
  //   }
  //   // await setRedisData(postId, results, 180, false);

  //   res.status(201).json({ message: "Data updated.....", data: results });
  // } catch (error:any) {
  //   console.error(error);
  //   res.status(404).json(error?.message);
  // }
};

export const getCommentsByPostId = async (_parent, { postId }) => {
  let results;
  try {
    results = await fetchApiData(`comments/?postId=${postId}`);

    return {
      data: results,
      status: true,
      message: "Data fetched successfully",
    };
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
};
export const getAllComments = async (_parent, {}, _context, _info) => {
  let results;

  try {
    results = await fetchApiData(`comments`);
    // Store the user in Redis cache

    return {
      data: results,
      status: true,
      message: "Data fetched successfully",
    };
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
};

export const createPost = async (_parent, { input }, _context, _info) => {
  let results;
  try {
    results = await postApiData("posts", input);
    input["id"] = results?.id;

    return {
      status: false,
      message: "Post Data created sucessfully.",
      data: input,
    };
  } catch (error) {
    return {
      status: false,
      message: error?.message,
    };
  }
};

const resolversData = {
  Query: {
    getAllPosts: getAllPostsData,
    getSinglePost: getpostsData,
    getAllComments: getAllComments,
    getCommentsByPostId: getCommentsByPostId,
  },
  Mutation: {
    createPost: createPost,
  },
};
export { resolversData };
