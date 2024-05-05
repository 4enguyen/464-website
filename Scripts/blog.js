window.addEventListener('load', function() {
  fetch('get_comments.php')
  .then(response => response.json())
  .then(data => {
    const commentsSectionBlogOne = document.getElementById('commentsSection1');
    const commentsSectionBlogTwo = document.getElementById('commentsSection2');

    data.comments_blog1 = data.comments_blog1.split(', ');
    data.comments_blog2 = data.comments_blog2.split(', ');

    data.comments_blog1.forEach(comment => {
      const newComment = document.createElement('p');
      newComment.textContent = comment;
      commentsSectionBlogOne.appendChild(newComment);
    });

    data.comments_blog2.forEach(comment => {
      const newComment = document.createElement('p');
      newComment.textContent = comment;
      commentsSectionBlogTwo.appendChild(newComment);
    });
  });
});


const submitBlogOne = document.getElementById('submit1');
submitBlogOne.addEventListener('click', commentsForBlogOne);
function commentsForBlogOne() {
  const commentBlogOne = document.getElementById('comment1');
  const commentsSectionBlogOne = document.getElementById('commentsSection1');
  const newComment = document.createElement('p');
  newComment.textContent = commentBlogOne.value;
  commentsSectionBlogOne.appendChild(newComment);

  fetch('update_comments.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      comment_blog1: commentBlogOne.value
    }),
  })
  .then(response => response.text())
  .then(data => console.log(data));

  commentBlogOne.value = '';
}

const submitBlogTwo = document.getElementById('submit2');
submitBlogTwo.addEventListener('click', commentsForBlogTwo);
function commentsForBlogTwo() {
  const commentBlogTwo = document.getElementById('comment2');
  const commentsSectionBlogTwo = document.getElementById('commentsSection2');
  const newComment = document.createElement('p');
  newComment.textContent = commentBlogTwo.value;
  commentsSectionBlogTwo.appendChild(newComment);

  fetch('update_comments.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      comment_blog2: commentBlogTwo.value
    }),
  })
  .then(response => response.text())
  .then(data => console.log(data));

  commentBlogTwo.value = '';
}