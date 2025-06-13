"use client";

import { useState, useEffect } from 'react';
import { PageTitle } from '@/components/page-title';
import { Button } from '@/components/ui/button';
import { PlusCircle, Megaphone } from 'lucide-react';
import { BuzzEditor } from './components/buzz-editor';
import { useToast } from '@/hooks/use-toast';

interface Buzz {
  id: string;
  content: string;
  design: object;
  createdAt: string;
  updatedAt: string;
}

export default function BuzzPage() {
  const [buzzes, setBuzzes] = useState<Buzz[]>([]);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingBuzz, setEditingBuzz] = useState<Buzz | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchBuzzes();
  }, []);

  const fetchBuzzes = async () => {
    try {
      const response = await fetch('http://localhost:3000/buzz');
      if (!response.ok) throw new Error('Failed to fetch buzzes');
      const data = await response.json();
      setBuzzes(data);
    } catch (error) {
      console.error('Error fetching buzzes:', error);
      toast({
        title: "Error",
        description: "Failed to load buzzes. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAddBuzz = () => {
    setEditingBuzz(null);
    setIsEditorOpen(true);
  };

  const handleEditBuzz = (buzz: Buzz) => {
    setEditingBuzz(buzz);
    setIsEditorOpen(true);
  };

  const handleSave = () => {
    fetchBuzzes();
  };

  return (
    <>
      <PageTitle
        title="Manage Buzz"
        icon={Megaphone}
        action={
          <Button onClick={handleAddBuzz}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Buzz
          </Button>
        }
      />

      <div className="mt-6 space-y-6">
        {buzzes.map((buzz) => (
          <div
            key={buzz.id}
            className="rounded-lg border bg-card p-6 shadow-sm"
          >
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: buzz.content }} />
            <div className="mt-4 flex justify-between items-center text-sm text-muted-foreground">
              <div>
                Last updated: {new Date(buzz.updatedAt).toLocaleDateString()}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEditBuzz(buzz)}
              >
                Edit
              </Button>
            </div>
          </div>
        ))}

        {buzzes.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No buzz items yet. Click "Add Buzz" to create one.
          </div>
        )}
      </div>

      <BuzzEditor
        isOpen={isEditorOpen}
        onClose={() => {
          setIsEditorOpen(false);
          setEditingBuzz(null);
        }}
        onSave={async (html, design) => {
          const method = editingBuzz ? 'PATCH' : 'POST';
          const url = editingBuzz ? `http://localhost:3000/buzz/${editingBuzz.id}` : 'http://localhost:3000/buzz';

          try {
            const response = await fetch(url, {
              method,
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                content: html,
                design: design,
              }),
            });

            if (!response.ok) {
              throw new Error(`Failed to ${editingBuzz ? 'update' : 'create'} buzz`);
            }

            toast({
              title: "Success",
              description: `${editingBuzz ? 'Updated' : 'Created'} buzz successfully.`,
            });

            handleSave();
          } catch (error) {
            console.error(`Error ${editingBuzz ? 'updating' : 'creating'} buzz:`, error);
            toast({
              title: "Error",
              description: `${editingBuzz ? 'Update' : 'Create'} buzz. Please try again.`,
              variant: "destructive",
            });
          }
        }}
        initialDesign={editingBuzz?.design}
      />
    </>
  );
}
