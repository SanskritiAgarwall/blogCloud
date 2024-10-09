import mongoose from 'mongoose';
import blog from '@/models/blog';

export default async function handler(req, res) {
  const { id } = req.query;

  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  if (req.method === 'DELETE') {
    try {
      const deletedPost = await blog.findByIdAndDelete(id);
      if (!deletedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ message: 'Server error' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { message } = req.body; // Extract the updated message from the request body

      // Find the post by ID and update the message field
      const updatedPost = await blog.findByIdAndUpdate(
        id,
        { message },
        { new: true, runValidators: true } // Return the updated post and run validation
      );

      if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }

      res.status(200).json({ message: 'Message updated successfully', post: updatedPost });
    } catch (error) {
      console.error('Error updating message:', error);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.setHeader('Allow', ['DELETE', 'PUT']);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
