const http = require('http');

// Function to make HTTP requests
function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: `/api${path}`,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = http.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const parsedData = JSON.parse(responseData);
          resolve({ statusCode: res.statusCode, data: parsedData });
        } catch (e) {
          resolve({ statusCode: res.statusCode, data: responseData });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

// Test CRUD operations
async function testCrud() {
  try {
    console.log('Testing Tag CRUD operations:');
    
    // Create a tag
    console.log('\n1. Creating a tag:');
    const createTagResponse = await makeRequest('POST', '/blog/tags', {
      name: 'Technology',
      description: 'Technology related posts'
    });
    console.log('Status Code:', createTagResponse.statusCode);
    console.log('Response:', JSON.stringify(createTagResponse.data, null, 2));
    
    const tagId = createTagResponse.data.data.id;
    
    // Get all tags
    console.log('\n2. Getting all tags:');
    const getTagsResponse = await makeRequest('GET', '/blog/tags');
    console.log('Status Code:', getTagsResponse.statusCode);
    console.log('Response:', JSON.stringify(getTagsResponse.data, null, 2));
    
    // Get tag by ID
    console.log(`\n3. Getting tag with ID ${tagId}:`);
    const getTagResponse = await makeRequest('GET', `/blog/tags/${tagId}`);
    console.log('Status Code:', getTagResponse.statusCode);
    console.log('Response:', JSON.stringify(getTagResponse.data, null, 2));
    
    // Update tag
    console.log(`\n4. Updating tag with ID ${tagId}:`);
    const updateTagResponse = await makeRequest('PUT', `/blog/tags/${tagId}`, {
      name: 'Tech',
      description: 'All things tech related'
    });
    console.log('Status Code:', updateTagResponse.statusCode);
    console.log('Response:', JSON.stringify(updateTagResponse.data, null, 2));
    
    // Create a blog post
    console.log('\n5. Creating a blog post:');
    const createBlogResponse = await makeRequest('POST', '/blog/blogs', {
      title: 'Introduction to CRUD Operations',
      content: 'This is a comprehensive guide to CRUD operations using Angular and Node.js.',
      excerpt: 'Learn about CRUD operations with Angular and Node.js.',
      author: '660db8d1f47dbb61d62a7e01', // Using a dummy ObjectId
      tags: [tagId],
      status: 'published'
    });
    console.log('Status Code:', createBlogResponse.statusCode);
    console.log('Response:', JSON.stringify(createBlogResponse.data, null, 2));
    
    if (createBlogResponse.statusCode === 201) {
      const blogId = createBlogResponse.data.data.id;
      
      // Get all blogs
      console.log('\n6. Getting all blogs:');
      const getBlogsResponse = await makeRequest('GET', '/blog/blogs');
      console.log('Status Code:', getBlogsResponse.statusCode);
      console.log('Response:', JSON.stringify(getBlogsResponse.data, null, 2));
      
      // Get blog by ID
      console.log(`\n7. Getting blog with ID ${blogId}:`);
      const getBlogResponse = await makeRequest('GET', `/blog/blogs/${blogId}`);
      console.log('Status Code:', getBlogResponse.statusCode);
      console.log('Response:', JSON.stringify(getBlogResponse.data, null, 2));
      
      // Update blog
      console.log(`\n8. Updating blog with ID ${blogId}:`);
      const updateBlogResponse = await makeRequest('PUT', `/blog/blogs/${blogId}`, {
        title: 'Updated CRUD Guide',
        content: 'Updated content for the CRUD guide.',
        excerpt: 'Updated excerpt for the CRUD guide.'
      });
      console.log('Status Code:', updateBlogResponse.statusCode);
      console.log('Response:', JSON.stringify(updateBlogResponse.data, null, 2));
      
      // Delete blog
      console.log(`\n9. Deleting blog with ID ${blogId}:`);
      const deleteBlogResponse = await makeRequest('DELETE', `/blog/blogs/${blogId}`);
      console.log('Status Code:', deleteBlogResponse.statusCode);
      console.log('Response:', JSON.stringify(deleteBlogResponse.data, null, 2));
    }
    
    // Delete tag
    console.log(`\n10. Deleting tag with ID ${tagId}:`);
    const deleteTagResponse = await makeRequest('DELETE', `/blog/tags/${tagId}`);
    console.log('Status Code:', deleteTagResponse.statusCode);
    console.log('Response:', JSON.stringify(deleteTagResponse.data, null, 2));
    
  } catch (error) {
    console.error('Error during CRUD test:', error);
  }
}

// Run the tests
testCrud();