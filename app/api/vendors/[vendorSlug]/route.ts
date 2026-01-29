import { NextResponse } from 'next/server';
import { mockVendors } from '../data';



export async function GET(request: Request, { params }: { params: { vendorSlug: string } }) {
  try {
    const { vendorSlug } = params;

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));

    const vendor = mockVendors.find(v => v.slug === vendorSlug);

    if (!vendor) {
      return NextResponse.json(
        {
          success: false,
          message: `Vendor with slug '${vendorSlug}' not found`
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: vendor,
      message: 'Vendor retrieved successfully'
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to retrieve vendor',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}