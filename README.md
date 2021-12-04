<h2 id="overview">Overview</h2>
<p><em>Due Saturday, December 4 at 11:59:00pm</em></p>
<p><em>Submit through GitHub Classroom <strong>AND</strong> Canvas</em></p>
<p>GitHub Classroom Link: <em>TO BE UPDATED SOON</em></p>
<p>In JavaScript terms, I&rsquo;d like you to&hellip;</p>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token comment">// Get your friends</span>
$<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token string">"http://cs-it:4830-7830/friends"</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>friends<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// Get your computers</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token keyword">in</span> friends<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    friends<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">getComputer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// And some snacks</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>snacks <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> energyDrinks <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    friends<span class="token punctuation">.</span><span class="token function">code</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<p>In other words, the Hack Week Project is a collaborative, exploration-style challenge where you are to brainstorm and build a complete web application prototype. When the word <code>prototype</code> is being used here, it means a valid beta version of the app where the app is working correctly and can be demonstrated to the rest of the class using a live version.</p>
<p><strong>Help with Decision:</strong> If you need help on making a decision then let us know. The best project idea is something that interests you!</p>
<p>&nbsp;</p>
<h2 id="getting-started-and-github-submission-link">Getting Started and GitHub Submission Link</h2>
<p>To start the challenge, go to the link above.</p>
<p>Each feature (maybe each group member) will have their own branch.</p>
<p><code>Link</code> your account, <code>clone</code> the repository, make a new <code>branch</code>, go into the <code>code</code> directory, and <code>create</code> your application</p>
<p>Make sure you start a new <code>development</code> branch. The <code>master</code> branch will be the production branch. At the end, when you are finished, do the final <code>commit</code> from all the feature branches back to the <code>development</code>, and the final <code>merge</code> to <code>master</code> then <code>push</code> the <code>master</code>, <code>development</code>, and all the other feature branches back up for grading.</p>
<p><strong>If you work the entire time on master, you will get points deducted.</strong> This is not a good industry practice.</p>
<p>After pushing back to <code>origin</code> for the final submission, I recommend to go to your remote repository on GitHub, download the repository which will give you a zip file of your repo on your local machine, then submit that zip to canvas. The challenge submission will require both on GitHub and Canvas.</p>
<p><strong>Note:</strong> Make sure the Canvas submission has all of the elements that are included in your GitHub submission which includes a link to the server, the raw code, the journal, and screenshots of the application. <strong>Make sure the canvas submission is up-to-date.</strong></p>
<p>&nbsp;</p>
<h2 id="requirements">Requirements</h2>
<p>You should send me a list of your team and a team name. However, you should get started now, don&rsquo;t wait.</p>
<p>The content and function of the application are up to you. You could create a mashup that combines various web technologies and APIs; you could borrow concepts and ideas from the class; or you could search around the Internet and tech blogs for inspiration.</p>
<p>Hack Week is set for the week before Thanksgiving Break. Each project team will demo their work after Thanksgiving Break on Tuesday 12/7 and Thursday 12/9. Presentations are required for the grade, so have some fun while doing it and use this opportunity to show off your work!!</p>
<p>Hack Week Projects account for 20% of your weighted grade. Please use GitHub Classroom to share your code and host your result, you are also welcome to make a hybrid application. Firebase and other hosting services can be used. Submit a link to each here and <strong>be sure to include the names of your group members</strong>. Note: If you need a group, then let me know. This semester we will be working in groups of 3s.</p>
<p><strong>Note:</strong> Make sure you test your application and make sure it works correctly. Run through the document that you created (act like you are the person grading the assignment) to make sure the document is crystal clear.</p>
<p>&nbsp;</p>
<h2 id="what-and-where-to-submit">What and Where to Submit</h2>
<p><strong>For GitHub:</strong></p>
<ol>
    <li>Raw Code:
        <ul>
            <li>Server side code</li>
            <li>Front end code</li>
            <li>Database queries/schema</li>
            <li>etc.</li>
        </ul>
    </li>
    <li>Report with URL to your instance and:
        <ul>
            <li>Documentation for project (Format of document is Markdown. The documentation should be more like a project report not a list of items with the following sections).
                <ul>
                    <li>URL to Instance</li>
                    <li>Introduction
                        <ul>
                            <li>Group name, Group members, what you worked on and how to use it, basic background information</li>
                        </ul>
                    </li>
                    <li>The problem
                        <ul>
                            <li>What are you trying to solve</li>
                        </ul>
                    </li>
                    <li>Your solution
                        <ul>
                            <li>How you decided to solve the problem</li>
                        </ul>
                    </li>
                    <li>Related Work
                        <ul>
                            <li>Competitors</li>
                            <li>Similar projects</li>
                            <li>List the pros and cons of similar project/competitors and why your product is better
                                <ul>
                                    <li>Can be better in all areas, which should be explained</li>
                                    <li>Or can be better in specific set of areas</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>Implementation
                        <ul>
                            <li>Talk about the technologies you used</li>
                            <li>How you used them</li>
                            <li>Who implemented what</li>
                            <li>What and where we should look for grading purposes
                                <ul>
                                    <li>What do you want to show off in terms of hard work</li>
                                    <li>What are you proud of that you accomplished</li>
                                    <li>Show us where you did good work</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>Knowledge Gained
                        <ul>
                            <li>Pointers, knowledge, tricks to inform the rest of the class</li>
                        </ul>
                    </li>
                    <li>Future Work
                        <ul>
                            <li>What needs to be finished before the due date</li>
                            <li>What you wanted/planned to do but were not able to finish it</li>
                            <li>Most probably won&rsquo;t, but if you plan to work on this project after the course then please explain what your future plan is</li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    </li>
    <li>Screenshots of your application running with the system clock.
        <ul>
            <li>Take screenshots of ALL of your finished code</li>
            <li>The system clock must contain the date/time to be valid</li>
            <li><strong>Note:</strong> Link the screenshots in your report as in previous challenges/explorations</li>
        </ul>
    </li>
</ol>
<p><strong>For Canvas:</strong></p>
<ol start="4">
    <li>Submit the URL to the Team&rsquo;s GitHub Classroom Repo</li>
    <li>Submit your URL to your instance using a &ldquo;URL Submission&rdquo; type</li>
    <li>Then click on <code>Resubmit</code>, download your GitHub repository after your final submission and submit that zip file on Canvas and named it <code>&lt;TeamName&gt;HackWeekProjectF21.zip</code> where you replace <code>&lt;TeamName&gt;</code> with your actual team name.</li>
    <li>IF you made a mobile application with Ionic, then make sure you submit your app files either .apk or .ipa files, or the links to the application on the iOS app store or Google play store, but only if you created an Ionic application</li>
</ol>
<p>&nbsp;</p>
<p><strong>NOTE:</strong> For canvas, you cannot submit different types of submissions at the same time. Therefore, you may submit two different submissions, the first submission will be a <code>URL submission</code>, where you will copy and paste your URL to your output on the instance and GitHub Repo, then click submit. After the submission is successful, you will click on the big blue button called <code>Re-submit assignment</code>, then do a second submission for a <code>file upload</code>. You will upload a zip file from your final GitHub submission. On your end it will look like you only submitted the zip file but on our end we will see both submissions.</p>
<p>Total points is 200 -&gt; 100 points for finished product and 100 points for demo/presentation.</p>
<p>Have fun hacking!</p>
<h2 id="notes">Notes:</h2>
<ol>
    <li>There is a <code>code</code> directory in the GitHub classroom template, this is where your raw code will go. Make sure you do not submit any build code here.</li>
    <li>There is a <code>report</code> directory, this is where your markdown <code>.md</code> file will go for the report. Please link your screenshots in the report as in previous challenges. Place your URL link in the report. As well as the information that was asked of you in the requirements.</li>
    <li>There is a <code>screenshots</code> directory, you can place your screenshots there, but please link them in your report.</li>
</ol>
<h2 id="help">Help</h2>
<p>If there is anything unclear about what you need to do please let me or the TAs know. If you need help, office hours are located under <code>Modules</code> -&gt; <code>Course Information</code> -&gt; <code>Office Hours and TA Information</code></p>
<h2 id="due-datetime">Due date/time</h2>
<p>This hack week project will be <strong>due at 11:59:00PM on Saturday, December 4</strong>. Therefore, you will have approximately 2 weeks to complete this assignment. This includes pushing everything to GitHub classroom, submitting the downloaded zip from GitHub on Canvas, and posting the discussion.</p>
<p><strong>NOTE:</strong> Remember to complete the discussion board.<br /><strong>NOTE:</strong> Remember to submit the Instance link, GitHub link, and zip file on Canvas<br /><strong>NOTE:</strong> IF you created an Ionic application make sure you submit your app files<br /><strong>NOTE:</strong> Good place to look at structure of slides and presentation: <a href="http://dslsrv1.rnet.missouri.edu/resources/Slides%20Guideline%20For%20A%20Technical%20Presentation.htm">The Slide-Structure of a Technical 20-min Presentation</a><br /><strong>NOTE:</strong> Good place to look at <a href="https://www.professorwergeles.com/HowToGiveATalk.pptx">How to Give a Good Talk</a><br /><strong>NOTE:</strong> Good place to look at <a href="http://www.cs.columbia.edu/~hgs/etc/writing-style.html">How to Write a Good Technical Article</a></p>
<p>&nbsp;</p>
<hr />
<blockquote>
    <p>&copy; 2020 Professor Wergeles. All rights reserved.<br /><em>This document is provided with the materials for an educational course and are meant for personal use by the student while participating in the course and is not to be distributed to others.</em></p>
</blockquote>