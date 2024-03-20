const submitBlogOne = document.getElementById('submit1');
submitBlogOne.addEventListener('click', commentsForBlogOne);
function commentsForBlogOne() {
  const commentBlogOne = document.getElementById('comment1');
  const submitBlogOne = document.getElementById('submit1');
  const commentsSectionBlogOne = document.getElementById('commentsSection1');
  const newComment = document.createElement('p');
  newComment.textContent = commentBlogOne.value;
  commentsSectionBlogOne.appendChild(newComment);
  commentBlogOne.value = '';
}

const submitBlogTwo = document.getElementById('submit2');
submitBlogTwo.addEventListener('click', commentsForBlogTwo);
function commentsForBlogTwo() {
  const commentBlogTwo = document.getElementById('comment2');
  const submitBlogTwo = document.getElementById('submit2');
  const commentsSectionBlogTwo = document.getElementById('commentsSection2');
  const newComment = document.createElement('p');
  newComment.textContent = commentBlogTwo.value;
  commentsSectionBlogTwo.appendChild(newComment);
  commentBlogTwo.value = '';
}

const submitBlogThree = document.getElementById('submit3');
submitBlogThree.addEventListener('click', commentsForBlogThree);
function commentsForBlogThree() {
  const commentBlogThree = document.getElementById('comment3');
  const submitBlogThree = document.getElementById('submit3');
  const commentsSectionBlogThree = document.getElementById('commentsSection3');
  const newComment = document.createElement('p');
  newComment.textContent = commentBlogThree.value;
  commentsSectionBlogThree.appendChild(newComment);
  commentBlogThree.value = '';
}
